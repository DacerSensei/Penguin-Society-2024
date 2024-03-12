import { BufferUtilities } from "./buffer-utilities.js";
import { Camera } from "./camera.js";
import { triangle } from "./Shaders/shader.js";
import { QuadGeometry } from "./geometry.js";
import { Texture } from "./texture.js";
import { Content } from "./content.js";

class GameEngine {
    async InitializeEngine() {
        const canvasElement = document.getElementById("Scene");
        canvasElement.width = 1024;
        canvasElement.height = 576;
        this.Camera = new Camera(canvasElement.width, canvasElement.height);
        
        this.Context = canvasElement.getContext("webgpu");
        if (!this.Context) {
            alert("WebGPU is not supported");
            return;
        }

        const adapter = await navigator.gpu.requestAdapter({
            powerPreference: "low-power"
        });
        if (!adapter) {
            alert("No adapter found");
            return;
        }
        this.Device = await adapter.requestDevice();
        this.Context.configure({
            device: this.Device,
            format: navigator.gpu.getPreferredCanvasFormat(),
        });

        await Content.Initialize(this.Device);

        this.TestTexture = await Texture.CreateTextureFromURL(this.Device, "/Assets/uv_test.png");

        const geometry = new QuadGeometry();

        this.ProjectionViewMatrixBuffer = BufferUtilities.CreateUniformBuffer(this.Device, new Float32Array(16)); // 16 because i need 4 bytes for x y z z camera 1 float = 4 bytes
        this.VerticesBuffer = BufferUtilities.CreateVertexBuffer(this.Device, new Float32Array(geometry.Vertices));
        this.IndexBuffer = BufferUtilities.CreateIndexBuffer(this.Device, new Uint16Array(geometry.Indices));

        this.PrepareModel();

    }

    async PrepareModel() {

        const shaderModule = this.Device.createShaderModule({
            code: triangle,
        });

        const bufferLayout = {
            arrayStride: 7 * Float32Array.BYTES_PER_ELEMENT, // 7 because of vertices array is 7 per vertex
            attributes: [
                {
                    shaderLocation: 0,
                    offset: 0,
                    format: "float32x2" // 2 floats
                },
                {
                    shaderLocation: 1,
                    offset: 2 * Float32Array.BYTES_PER_ELEMENT, // 2 offset because it is the starting position in the vertex array of u v
                    format: "float32x2" // 2 floats
                },
                {
                    shaderLocation: 2,
                    offset: 4 * Float32Array.BYTES_PER_ELEMENT, // 4 offset because it is the starting position in the vertex array of r g b
                    format: "float32x3" // 2 floats
                }
            ],
            stepMode: "vertex"
        };

        const vertexState = {
            module: shaderModule,
            entryPoint: "VertexMain",
            buffers: [
                bufferLayout,
            ]
        };

        const fragmentState = {
            module: shaderModule,
            entryPoint: "FragmentMain",
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat(),
                blend: {
                    color: {
                        srcFactor: "one",
                        dstFactor: "one-minus-src-alpha",
                        operation: "add"
                    },
                    alpha: {
                        srcFactor: "one",
                        dstFactor: "one-minus-src-alpha",
                        operation: "add"
                    }
                }
            }]
        };

        // bind group layout
        const projectionViewBindGroupLayout = this.Device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {
                    type: "uniform"
                }
            }]
        });
        this.ProjectionViewBindGroup = this.Device.createBindGroup({
            layout: projectionViewBindGroupLayout,
            entries: [{
                binding: 0,
                resource: {
                    buffer: this.ProjectionViewMatrixBuffer}
            }]
        });

        const textureBindGroupLayout = this.Device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                sampler: {}
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                texture: {}
            }]
        });
        this.TextureBindGroup = this.Device.createBindGroup({
            layout: textureBindGroupLayout,
            entries: [{
                binding: 0,
                resource: Content.PlayerTexture.Sampler
            },
            {
                binding: 1,
                resource: Content.PlayerTexture.Texture.createView()
            }]
        });

        // pipeline layout
        // defining what groups in the wgsl group 0 and group 1 for example. 
        // we separate in group because not every group is changing every frame, its like parallel changing
        // and the binding is for the different types of data in group
        // group for container of every sets of data
        const pipelineLayout = this.Device.createPipelineLayout({
            bindGroupLayouts: [ 
                projectionViewBindGroupLayout,
                textureBindGroupLayout
            ]
        });

        this.Pipeline = this.Device.createRenderPipeline({
            vertex: vertexState,
            fragment: fragmentState,
            primitive: {
                topology: "triangle-list"
            },
            layout: pipelineLayout
        });
    }

    Draw() {
        this.Camera.Update();
        const commandEncoder = this.Device.createCommandEncoder();
        const renderPassDescriptor = {
            colorAttachments: [{
                view: this.Context.getCurrentTexture().createView(),
                clearValue: { r: .8, g: .8, b: .8, a: 1.0 },
                loadOp: "clear",
                storeOp: "store"
            }]
        }
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        this.Device.queue.writeBuffer(this.ProjectionViewMatrixBuffer, 0, this.Camera.ProjectionViewMatrix);
        // Draw here
        passEncoder.setPipeline(this.Pipeline);

        passEncoder.setIndexBuffer(this.IndexBuffer, "uint16");
        passEncoder.setVertexBuffer(0, this.VerticesBuffer);
        passEncoder.setBindGroup(0, this.ProjectionViewBindGroup);
        passEncoder.setBindGroup(1, this.TextureBindGroup);

        passEncoder.drawIndexed(6);
        passEncoder.end();
        this.Device.queue.submit([commandEncoder.finish()]);
    }
}

const Game = new GameEngine();
Game.InitializeEngine().then(() => Game.Draw());
