import { Texture } from "./texture.js"

export class Content {
    static async Initialize(device){
        Content.PlayerTexture = await Texture.CreateTextureFromURL(device, "/Assets/uv_test.png");
        Content.Test = await Texture.CreateTextureFromURL(device, "/Assets/Red-Left.png");
    }
}