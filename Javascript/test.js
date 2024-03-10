import { triangle } from "./Shaders/shader.js";
import { QuadGeometry } from "./geometry.js";
import { Texture } from "./texture.js";

class GameEngine {
    async InitializeEngine() {
        const canvasElement = document.getElementById("Scene");
        canvasElement.width = 1024;
        canvasElement.height = 576;
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

        this.TestTexture = await Texture.CreateTextureFromURL(this.Device, "/Assets/uv_test.png");
        this.PrepareModel();
        const geometry = new QuadGeometry();
        this.PositonBuffer = this.CreateBuffer(new Float32Array(geometry.Position));
        this.ColorBuffer = this.CreateBuffer(new Float32Array(geometry.Colors));
        this.TextureCoordinatesBuffer = this.CreateBuffer(new Float32Array(geometry.TextureCoordinates));
    }

    async PrepareModel() {

        const shaderModule = this.Device.createShaderModule({
            code: triangle,
        });

        const positionBufferLayout = {
            arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [{
                shaderLocation: 0,
                offset: 0,
                format: "float32x2" // 2 floats
            }],
            stepMode: "vertex"
        };

        const colorBufferLayout = {
            arrayStride: 3 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [{
                shaderLocation: 1,
                offset: 0,
                format: "float32x3" // 3 floats
            }],
            stepMode: "vertex"
        };

        const textureCoordinatesBufferLayout = {
            arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [{
                shaderLocation: 2,
                offset: 0,
                format: "float32x2" // 2 floats
            }],
            stepMode: "vertex"
        };

        const vertexState = {
            module: shaderModule,
            entryPoint: "VertexMain",
            buffers: [
                positionBufferLayout,
                colorBufferLayout,
                textureCoordinatesBufferLayout
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

        const pipelineLayout = this.Device.createPipelineLayout({
            bindGroupLayouts: [
                textureBindGroupLayout
            ]
        });

        this.TextureBindGroup = this.Device.createBindGroup({
            layout: textureBindGroupLayout,
            entries: [{
                binding: 0,
                resource: this.TestTexture.Sampler
            },
            {
                binding: 1,
                resource: this.TestTexture.Texture.createView()
            }]
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
        // Draw here
        passEncoder.setPipeline(this.Pipeline);

        passEncoder.setVertexBuffer(0, this.PositonBuffer);
        passEncoder.setVertexBuffer(1, this.ColorBuffer);
        passEncoder.setVertexBuffer(2, this.TextureCoordinatesBuffer);
        passEncoder.setBindGroup(0, this.TextureBindGroup);

        passEncoder.draw(6);
        passEncoder.end();
        this.Device.queue.submit([commandEncoder.finish()]);
    }

    CreateBuffer(data) {
        const buffer = this.Device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });
        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
    }
}

const Game = new GameEngine();
Game.InitializeEngine().then(() => Game.Draw());
