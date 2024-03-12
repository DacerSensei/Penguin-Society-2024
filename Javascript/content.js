import { Texture } from "./texture.js"

export class Content {
    static async Initialize(device){
        Content.PlayerTexture = await Texture.CreateTextureFromURL(device, "/Assets/uv_test.png");
    }
}