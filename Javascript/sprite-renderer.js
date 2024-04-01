import { SpritePipeline } from "./sprite-pipeline.js";
import { BufferUtilities } from "./buffer-utilities.js";
import { Camera } from "./camera.js";
import { Rect } from "./rect.js";
import { Texture } from "./texture.js";

const MAX_NUMBER_OF_SPRITE = 10000;
const INDICES_PER_SPRITE = 6; // 2 triangle per sprite
const FLOAT_PER_VERTEX = 7;
const FLOAT_PER_SPRITE = 4 * FLOAT_PER_VERTEX;

export class SpriteRenderer {
    /**
     * Creates an instance of Rectangle.
     * @param {GPUDevice} device - Instance of GPU device in WebGPU..
     * @param {number} width - Width of the canvas.
     * @param {number} height - Height of the canvas.
     */
    constructor(device, width, height) {
        this.Device = device;
        this.Camera = new Camera(width, height);

        this.CurrentTexture;
        this.PipelinesPerTexture = {};
        this.BatchDrawCallPerTexture = {};
        this.AllocatedVertexBuffers = [];
    }

    Initialize() {
        this.ProjectionViewMatrixBuffer = BufferUtilities.CreateUniformBuffer(this.Device, new Float32Array(16)); // 16 because i need 4 bytes for x y z z camera 1 float = 4 bytes
        this.IndexBuffer = this.SetupIndexBuffer();
    }

    SetupIndexBuffer() {
        const data = new Uint16Array(MAX_NUMBER_OF_SPRITE * INDICES_PER_SPRITE);
        for (let i = 0; i < MAX_NUMBER_OF_SPRITE; i++) {
            data[i * INDICES_PER_SPRITE + 0] = i * 4 + 0;
            data[i * INDICES_PER_SPRITE + 1] = i * 4 + 1;
            data[i * INDICES_PER_SPRITE + 2] = i * 4 + 3;
            data[i * INDICES_PER_SPRITE + 3] = i * 4 + 3;
            data[i * INDICES_PER_SPRITE + 4] = i * 4 + 2;
            data[i * INDICES_PER_SPRITE + 5] = i * 4 + 1;
        }
        return BufferUtilities.CreateIndexBuffer(this.Device, data);
    }

    /**
     * @param {GPURendererPassEncoder} passEncoder - Instance of GPURendererPassEncoder from WebGPU.
     */
    FramePass(passEncoder) {
        this.PassEncoder = passEncoder;
        this.BatchDrawCallPerTexture = {};
        this.CurrentTexture = undefined;

        this.Camera.Update();

        this.Device.queue.writeBuffer(this.ProjectionViewMatrixBuffer, 0, this.Camera.ProjectionViewMatrix);
    }

    /**
     * @param {Texture} texture - Instance of Texture.
     * @param {Rect} rect - Instance of Rect.
     */
    DrawSprite(texture, rect) {
        if (this.CurrentTexture != texture) {
            this.CurrentTexture = texture;

            let pipeline = this.PipelinesPerTexture[texture.Id];
            if (!pipeline) {
                pipeline = new SpritePipeline(this.Device, texture, this.ProjectionViewMatrixBuffer);
                this.PipelinesPerTexture[texture.Id] = pipeline;
            }
            
            let batchDrawCalls = this.BatchDrawCallPerTexture[texture.Id];
            if (!batchDrawCalls) {
                this.BatchDrawCallPerTexture[texture.Id] = [];
            }
        }
        
        const arrayOfBatchCalls = this.BatchDrawCallPerTexture[texture.Id];
        let batchDrawCall = arrayOfBatchCalls[arrayOfBatchCalls.length - 1];
        if (!batchDrawCall) {
            batchDrawCall = new BatchDrawCall(this.PipelinesPerTexture[texture.Id]);
            this.BatchDrawCallPerTexture[texture.Id].push(batchDrawCall);
        }

        if(batchDrawCall.InstanceCount == MAX_NUMBER_OF_SPRITE){
            const newBatchDrawCall = new BatchDrawCall(this.PipelinesPerTexture[texture.Id])
            this.BatchDrawCallPerTexture[texture.Id].push(newBatchDrawCall);
            batchDrawCall = newBatchDrawCall;
        } // To avoid creating empty array

        let iteration = batchDrawCall.InstanceCount * FLOAT_PER_SPRITE;

        const vertices = [
            { x: rect.X, y: rect.Y, u: 0.0, v: 0.0 },
            { x: rect.X + rect.Width, y: rect.Y, u: 1.0, v: 0.0 },
            { x: rect.X + rect.Width, y: rect.Y + rect.Height, u: 1.0, v: 1.0 },
            { x: rect.X, y: rect.Y + rect.Height, u: 0.0, v: 1.0 }
        ];
        const textureCoordinates = [
            { u: 0.0, v: 0.0 },
            { u: 1.0, v: 0.0 },
            { u: 1.0, v: 1.0 },
            { u: 0.0, v: 1.0 }
        ]
        for (let i = 0; i < vertices.length; i++) {
            // set position
            batchDrawCall.VertexData[i * 7 + 0 + iteration] = vertices[i].x;
            batchDrawCall.VertexData[i * 7 + 1 + iteration] = vertices[i].y;
            // set texture coordinates (u,v)
            batchDrawCall.VertexData[i * 7 + 2 + iteration] = textureCoordinates[i].u;
            batchDrawCall.VertexData[i * 7 + 3 + iteration] = textureCoordinates[i].v
            // set colors (r,g,b)
            batchDrawCall.VertexData[i * 7 + 4 + iteration] = 1.0;
            batchDrawCall.VertexData[i * 7 + 5 + iteration] = 1.0;
            batchDrawCall.VertexData[i * 7 + 6 + iteration] = 1.0;
        }

        batchDrawCall.InstanceCount++;

    }

    /**
     * @param {Texture} texture - Instance of Texture.
     * @param {Rect} rect - Instance of Rect.
     * @param {Rect} rect - Instance of Rect.
     */
    DrawSpriteSource(texture, rect, sourceRect) {
        if (this.CurrentTexture != texture) {
            this.CurrentTexture = texture;

            let pipeline = this.PipelinesPerTexture[texture.Id];
            if (!pipeline) {
                pipeline = new SpritePipeline(this.Device, texture, this.ProjectionViewMatrixBuffer);
                this.PipelinesPerTexture[texture.Id] = pipeline;
            }

            let batchDrawCalls = this.BatchDrawCallPerTexture[texture.Id];
            if (!batchDrawCalls) {
                this.BatchDrawCallPerTexture[texture.Id] = [];
            }
        }
        const arrayOfBatchCalls = this.BatchDrawCallPerTexture[texture.Id];
        let batchDrawCall = arrayOfBatchCalls[arrayOfBatchCalls.length - 1];
        if (!batchDrawCall) {
            batchDrawCall = new BatchDrawCall(this.PipelinesPerTexture[texture.Id]);
            this.BatchDrawCallPerTexture[texture.Id].push(batchDrawCall);
        }

        if(batchDrawCall.InstanceCount == MAX_NUMBER_OF_SPRITE){
            const newBatchDrawCall = new BatchDrawCall(this.PipelinesPerTexture[texture.Id])
            this.BatchDrawCallPerTexture[texture.Id].push(newBatchDrawCall);
            batchDrawCall = newBatchDrawCall;
        } // To avoid creating empty array

        let iteration = batchDrawCall.InstanceCount * FLOAT_PER_SPRITE;

        const vertices = [
            { x: rect.X, y: rect.Y, u: 0.0, v: 0.0 },
            { x: rect.X + rect.Width, y: rect.Y, u: 1.0, v: 0.0 },
            { x: rect.X + rect.Width, y: rect.Y + rect.Height, u: 1.0, v: 1.0 },
            { x: rect.X, y: rect.Y + rect.Height, u: 0.0, v: 1.0 }
        ];
        
        let u0 = sourceRect.X / texture.Width;
        let v0 = sourceRect.Y / texture.Height;
        let u1 = (sourceRect.X + sourceRect.Width) / texture.Width;
        let v1 = (sourceRect.Y + sourceRect.Height) / texture.Height;

        const textureCoordinates = [
            { u: u0, v: v0 },
            { u: u1, v: v0 },
            { u: u1, v: v1 },
            { u: u0, v: v1 }
        ];

        for (let i = 0; i < vertices.length; i++) {
            // set position
            batchDrawCall.VertexData[i * 7 + 0 + iteration] = vertices[i].x;
            batchDrawCall.VertexData[i * 7 + 1 + iteration] = vertices[i].y;
            // set texture coordinates (u,v)
            batchDrawCall.VertexData[i * 7 + 2 + iteration] = textureCoordinates[i].u;
            batchDrawCall.VertexData[i * 7 + 3 + iteration] = textureCoordinates[i].v
            // set colors (r,g,b)
            batchDrawCall.VertexData[i * 7 + 4 + iteration] = 1.0;
            batchDrawCall.VertexData[i * 7 + 5 + iteration] = 1.0;
            batchDrawCall.VertexData[i * 7 + 6 + iteration] = 1.0;
        }

        batchDrawCall.InstanceCount++;

    }

    FrameEnd() {
        let usedVertexBuffers = [];

        for (const key in this.BatchDrawCallPerTexture) {
            const arrayOfBatchDrawCalls = this.BatchDrawCallPerTexture[key];

            for (const batchDrawCall of arrayOfBatchDrawCalls) {
                if (batchDrawCall.InstanceCount == 0) continue;

                let vertexBuffer = this.AllocatedVertexBuffers.pop();
                if (!vertexBuffer) {
                    vertexBuffer = BufferUtilities.CreateVertexBuffer(this.Device, batchDrawCall.VertexData);
                } else {
                    this.Device.queue.writeBuffer(vertexBuffer, 0, batchDrawCall.VertexData);
                }
                usedVertexBuffers.push(vertexBuffer);

                const spritePipeline = batchDrawCall.Pipeline;

                this.PassEncoder.setPipeline(spritePipeline.Pipeline);
                this.PassEncoder.setIndexBuffer(this.IndexBuffer, "uint16");
                this.PassEncoder.setVertexBuffer(0, vertexBuffer);
                this.PassEncoder.setBindGroup(0, spritePipeline.ProjectionViewBindGroup);
                this.PassEncoder.setBindGroup(1, spritePipeline.TextureBindGroup);

                this.PassEncoder.drawIndexed(6 * batchDrawCall.InstanceCount); // draw 6 vertices
            }
        }

        for (let vertexBuffer of usedVertexBuffers) {
            this.AllocatedVertexBuffers.push(vertexBuffer);
        }
    }
}

export class BatchDrawCall {
    constructor(pipeline) {
        this.Pipeline = pipeline;
        this.VertexData = new Float32Array(MAX_NUMBER_OF_SPRITE * FLOAT_PER_SPRITE);
        this.InstanceCount = 0;
    }
}