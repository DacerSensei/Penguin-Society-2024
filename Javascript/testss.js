import { BufferUtil } from "./buffer-utilities.js";
import { Camera } from "./camera.js";
import { Rect } from "./rect.js";
import { SpritePipeline } from "./sprite-pipeline.js";
import { Texture } from "./texture.js";

const MAX_NUMBER_OF_SPRITES = 1000;
const FLOAT_PER_VERTEX = 7;
const FLOATS_PER_SPRITE = 4 * FLOAT_PER_VERTEX;
const INDICES_PER_SPRITE = 6; // 2 triangles per sprite

class BatchDrawCall {
    constructor(pipeline) {
        this.pipeline = pipeline;
        this.vertexData = new Float32Array(MAX_NUMBER_OF_SPRITES * FLOATS_PER_SPRITE);
        this.instanceCount = 0;
    }
}

class SpriteRenderer {
    constructor(device, width, height) {
        this.device = device;
        this.width = width;
        this.height = height;
        this.camera = new Camera(this.width, this.height);
        this.pipelinesPerTexture = {};
        this.batchDrawCallPerTexture = {};
        this.allocatedVertexBuffers = [];
    }

    SetupIndexBuffer() {
        const data = new Uint16Array(MAX_NUMBER_OF_SPRITES * INDICES_PER_SPRITE);
        for (let i = 0; i < MAX_NUMBER_OF_SPRITES; i++) {
            data[i * INDICES_PER_SPRITE + 0] = i * 4 + 0;
            data[i * INDICES_PER_SPRITE + 1] = i * 4 + 1;
            data[i * INDICES_PER_SPRITE + 2] = i * 4 + 2;
            data[i * INDICES_PER_SPRITE + 3] = i * 4 + 2;
            data[i * INDICES_PER_SPRITE + 4] = i * 4 + 3;
            data[i * INDICES_PER_SPRITE + 5] = i * 4 + 0;
        }
        this.indexBuffer = BufferUtil.createIndexBuffer(this.device, data);
    }

    Initialize() {
        this.projectionViewMatrixBuffer = BufferUtil.createUniformBuffer(this.device, new Float32Array(16));
        this.setupIndexBuffer();
    }

    FramePass(passEncoder) {
        this.passEncoder = passEncoder;
        this.batchDrawCallPerTexture = {};
        this.camera.update();
        this.device.queue.writeBuffer(this.projectionViewMatrixBuffer, 0, this.camera.projectionViewMatrix);
    }

    DrawSprite(texture, rect) {
        if (this.currentTexture != texture) {
            this.currentTexture = texture;
            let pipeline = this.pipelinesPerTexture[texture.id];
            if (!pipeline) {
                pipeline = SpritePipeline(this.device, texture, this.projectionViewMatrixBuffer);
                this.pipelinesPerTexture[texture.id] = pipeline;
            }
            let batchDrawCalls = this.batchDrawCallPerTexture[texture.id];
            if (!batchDrawCalls) {
                this.batchDrawCallPerTexture[texture.id] = [];
            }
        }
        const arrayOfBatchCalls = this.batchDrawCallPerTexture[texture.id];
        let batchDrawCall = arrayOfBatchCalls[arrayOfBatchCalls.length - 1];
        if (!batchDrawCall) {
            batchDrawCall = new BatchDrawCall(this.pipelinesPerTexture[texture.id]);
            this.batchDrawCallPerTexture[texture.id].push(batchDrawCall);
        }
        let i = batchDrawCall.instanceCount * FLOATS_PER_SPRITE;
        batchDrawCall.vertexData.set([
            rect.x, rect.y, 0.0, 0.0, 1.0, 1.0, 1.0,
            rect.x + rect.width, rect.y, 1.0, 0.0, 1.0, 1.0, 1.0,
            rect.x + rect.width, rect.y + rect.height, 1.0, 1.0, 1.0, 1.0, 1.0,
            rect.x, rect.y + rect.height, 0.0, 1.0, 1.0, 1.0, 1.0
        ], i);
        batchDrawCall.instanceCount++;
        if (batchDrawCall.instanceCount >= MAX_NUMBER_OF_SPRITES) {
            const newBatchDrawCall = new BatchDrawCall(this.pipelinesPerTexture[texture.id]);
            this.batchDrawCallPerTexture[texture.id].push(newBatchDrawCall);
        }
    }

    FrameEnd() {
        let usedVertexBuffers = [];
        for (const key in this.batchDrawCallPerTexture) {
            const arrayOfBatchDrawCalls = this.batchDrawCallPerTexture[key];
            for (const batchDrawCall of arrayOfBatchDrawCalls) {
                if (batchDrawCall.instanceCount == 0)
                    continue;
                let vertexBuffer = this.allocatedVertexBuffers.pop();
                if (!vertexBuffer) {
                    vertexBuffer = BufferUtil.createVertexBuffer(this.device, batchDrawCall.vertexData);
                }
                else {
                    this.device.queue.writeBuffer(vertexBuffer, 0, batchDrawCall.vertexData);
                }
                usedVertexBuffers.push(vertexBuffer);
                const spritePipeline = batchDrawCall.pipeline;
                this.passEncoder.setPipeline(spritePipeline.pipeline);
                this.passEncoder.setIndexBuffer(this.indexBuffer, "uint16");
                this.passEncoder.setVertexBuffer(0, vertexBuffer);
                this.passEncoder.setBindGroup(0, spritePipeline.projectionViewBindGroup);
                this.passEncoder.setBindGroup(1, spritePipeline.textureBindGroup);
                this.passEncoder.drawIndexed(6 * batchDrawCall.instanceCount);
            }
        }
        for (let vertexBuffer of usedVertexBuffers) {
            this.allocatedVertexBuffers.push(vertexBuffer);
        }
    }
}