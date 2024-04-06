import * as vec2 from "../Library/Matrix/vec2.js";

export const Origin = {
    Center: vec2.fromValues(0.5, 0.5),
    TopLeft: vec2.fromValues(0, 0),
    TopRight: vec2.fromValues(1, 0),
    BottomRight: vec2.fromValues(1, 1),
    BottomLeft: vec2.fromValues(0, 1)
}

export class Toolkit {
    static IsNumber(value){
        if(typeof value !== this.#Type.NUMBER){
            throw new TypeError("Value must be a number");
        }
    }

    static IsString(value){
        if(typeof value !== this.#Type.STRING){
            throw new TypeError("Value must be a string");
        }
    }

    static IsObject(value){
        if(typeof value !== this.#Type.OBJECT){
            throw new TypeError("Value must be an object");
        }
    }

    static #Type = {
        NUMBER: 'number',
        STRING: "string",
        OBJECT: "object"
    }
}