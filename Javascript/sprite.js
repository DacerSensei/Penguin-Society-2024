import { Texture } from "./Texture.js";
import { Rect } from "./Rect.js";
export class Sprite {

    /** @type {Texture} */ #Texture;
    /** @type {Rect} */ #DrawRect;
    /** @type {Rect} */ #SourceRect;

    /**
     * @param {Texture} texture - Instance of Texture.
     * @param {Rect} drawRect - Instance of Rect.
     * @param {Rect} sourceRect - Instance of Rect.
     */
    constructor(texture, drawRect, sourceRect){
        this.#Texture = texture;
        this.#DrawRect = drawRect;
        this.#SourceRect = sourceRect;
    }

    get Texture(){
        return this.#Texture;
    }
    get DrawRect(){
        return this.#DrawRect;
    }
    get SourceRect(){
        return this.#SourceRect;
    }
}