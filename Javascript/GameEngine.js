import { Content } from "./Content.js";
import { Rect } from "./Rect.js";
import { SpriteRenderer } from "./SpriteRenderer.js";
import { Color } from "./Color.js";
import { Rotation } from "./Rotation.js";
import { Origin } from "./Toolkit.js";
import { InputManager } from "./InputManager.js";

export class GameEngine {
    constructor(){
        this.LastTime = 0;
        this.InputManager;
    }

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

        this.InputManager = new InputManager();
    }

    Draw() {
        // For normalize fps in every machine
        const now = performance.now();
        const deltaTime = now - this.LastTime;
        this.LastTime = now;
        this.OnUpdate(deltaTime);
        
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

        this.OnDraw();


        // this.SpriteRenderer.DrawSpriteSource(Content.Test, new Rect(this.Canvas.width / 2 - 32, this.Canvas.height / 2 - 32, 256, 256), new Rect(0, 0, 256, 256));
        // this.SpriteRenderer.DrawSpriteSource(Content.Test, new Rect(32, 32, 16 * 3, 16 * 3), new Rect(0, 16, 16, 16));

        // End Draw
        this.SpriteRenderer.FrameEnd();
        this.PassEncoder.end();
        this.Device.queue.submit([commandEncoder.finish()]);
        window.requestAnimationFrame(() => this.Draw());
    }

    OnUpdate = (deltaTime) => {

    };

    OnDraw = () => {

    }
}
