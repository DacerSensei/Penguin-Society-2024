import { Texture } from "./Texture.js";
import { Sprite } from "./Sprite.js";
import { Rect } from "./Rect.js";

export class Content {
    constructor() {
        this.Sprites = {};
    }
    /**
     * 
     * @param {GPUDevice} device 
     */
    static async Initialize(device) {
        this.PlayerTexture = await Texture.CreateTextureFromURL(device, "/Assets/uv_test.png");
        this.Test = await Texture.CreateTextureFromURL(device, "/Assets/SpriteSheet/sample.png");

        this.Sprites = await this.LoadSpriteSheet();
    }

    static async LoadSpriteSheet() {
        const sprites = {};
        const sheetXmlReq = await fetch("/Assets/Spritesheet/CharacterSheet.xml");
        const sheetXmlText = await sheetXmlReq.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sheetXmlText, "text/html");

        xmlDoc.querySelectorAll("SubTexture").forEach(subTexture => {
            const name = subTexture.getAttribute("name").replace(".png", "");
            const x = parseInt(subTexture.getAttribute("x"));
            const y = parseInt(subTexture.getAttribute("y"));
            const width = parseInt(subTexture.getAttribute("width"));
            const height = parseInt(subTexture.getAttribute("height"));

            sprites[name] = new Sprite(this.Test, new Rect(0, 0, width, height), new Rect(x, y, width, height));
        });
        return sprites;
    }
}