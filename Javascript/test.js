import { Content } from "./content.js";
import { Rect } from "./rect.js";
import { SpriteRenderer } from "./sprite-renderer.js";

class GameEngine {
    async InitializeEngine() {
        this.PassEncoder;

        this.Canvas = document.getElementById("Scene");
        this.Canvas.width = 1024;
        this.Canvas.height = 576;

        this.Context = this.Canvas.getContext("webgpu");
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

        this.SpriteRenderer = new SpriteRenderer(this.Device, this.Canvas.width, this.Canvas.height);
        this.SpriteRenderer.Initialize();
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
        this.PassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        this.SpriteRenderer.FramePass(this.PassEncoder);
        // Draw here

        for(let i = 0; i < 1; i++){
            this.SpriteRenderer.DrawSprite(Content.PlayerTexture, new Rect(Math.random() * this.Canvas.width, Math.random() * this.Canvas.height, 16 * 3, 16 * 3));
        }

        // End Draw
        this.SpriteRenderer.FrameEnd();
        this.PassEncoder.end();
        this.Device.queue.submit([commandEncoder.finish()]);
        window.requestAnimationFrame(() => this.Draw());
    }
}

const Game = new GameEngine();
Game.InitializeEngine().then(() => Game.Draw());
