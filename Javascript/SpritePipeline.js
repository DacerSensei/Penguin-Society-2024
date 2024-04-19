import { Shader } from "./Shaders/shader.js";
import { Texture } from "./Texture.js";

/**
 * Represents a Pipelines
 * @class
 */
export class SpritePipeline {

    /** @type {GPURenderPipeline} */#Pipeline;
    /** @type {GPUBindGroup} */ #ProjectionViewBindGroup;
    /** @type {GPUBindGroup} */#TextureBindGroup;

    /**
     * @param {GPUDevice} device 
     * @param {Texture} texture 
     * @param {GPUBuffer} projectionViewMatrixBuffer 
     */
    constructor(device, texture, projectionViewMatrixBuffer) {
        const shaderModule = device.createShaderModule({
            code: Shader,
        });

        /** @type {GPUVertexBufferLayout} */
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

        /** @type {GPUVertexState} */
        const vertexState = {
            module: shaderModule,
            entryPoint: "VertexMain",
            buffers: [
                bufferLayout,
            ]
        };

        /** @type {GPUFragmentState} */
        const fragmentState = {
            module: shaderModule,
            entryPoint: "FragmentMain",
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat(),
                blend: {
                    color: { // black outline means premultiplied, white means straight
                        srcFactor: "src-alpha", // one if premultiplied and src-alpha if straight
                        dstFactor: "one-minus-src-alpha",
                        operation: "add"
                    },
                    alpha: {
                        srcFactor: "one", // one if premultiplied and src-alpha if straight
                        dstFactor: "one-minus-src-alpha",
                        operation: "add"
                    }
                }
            }]
        };

        // bind group layout
        const projectionViewBindGroupLayout = device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {
                    type: "uniform"
                }
            }]
        });
        this.#ProjectionViewBindGroup = device.createBindGroup({
            layout: projectionViewBindGroupLayout,
            entries: [{
                binding: 0,
                resource: {
                    buffer: projectionViewMatrixBuffer
                }
            }]
        });

        const textureBindGroupLayout = device.createBindGroupLayout({
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
        this.#TextureBindGroup = device.createBindGroup({
            layout: textureBindGroupLayout,
            entries: [{
                binding: 0,
                resource: texture.Sampler
            },
            {
                binding: 1,
                resource: texture.Texture.createView()
            }]
        });

        // pipeline layout
        // defining what groups in the wgsl group 0 and group 1 for example. 
        // we separate in group because not every group is changing every frame, its like parallel changing
        // and the binding is for the different types of data in group
        // group for container of every sets of data
        const pipelineLayout = device.createPipelineLayout({
            bindGroupLayouts: [
                projectionViewBindGroupLayout,
                textureBindGroupLayout
            ]
        });

        this.#Pipeline = device.createRenderPipeline({
            vertex: vertexState,
            fragment: fragmentState,
            primitive: {
                topology: "triangle-list"
            },
            layout: pipelineLayout
        });
    }

    get ProjectionViewBindGroup() {
        return this.#ProjectionViewBindGroup;
    }
    get TextureBindGroup() {
        return this.#TextureBindGroup;
    }
    get Pipeline() {
        return this.#Pipeline;
    }
}