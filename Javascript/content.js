import { Texture } from "./texture.js";
import { Sprite } from "./sprite.js";
import { Rect } from "./rect.js";

export class Content {
    constructor() {
        this.Sprites = {};
    }
    static async Initialize(device) {
        this.PlayerTexture = await Texture.CreateTextureFromURL(device, "/Assets/uv_test.png");
        this.Test = await Texture.CreateTextureFromURL(device, "/Assets/Spritesheet/CharacterSheet.png");

        this.Sprites = await this.LoadSpriteSheet();
    }

    static async LoadSpriteSheet() {
        const sprites = {};
        const sheetXmlReq = await fetch("/Assets/Spritesheet/CharacterSheet.xml");
        const sheetXmlText = await sheetXmlReq.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sheetXmlText, "text/html");

        xmlDoc.querySelectorAll("SubTexture").forEach(subTexture => {
            const name = subTexture.getAttribute("name");
            const x = parseInt(subTexture.getAttribute("x"));
            const y = parseInt(subTexture.getAttribute("y"));
            const width = parseInt(subTexture.getAttribute("width"));
            const height = parseInt(subTexture.getAttribute("height"));

            sprites[name] = new Sprite(this.Test, new Rect(0, 0, width, height), new Rect(x, y, width, height));
        });
        return sprites;
    }
}