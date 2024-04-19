import * as Vector2D from "./Matrix/Vector2D.js";
//ts-check

/**
 * @readonly
 * @type {{Center: Vector2D,TopLeft: Vector2D,TopRight: Vector2D,BottomRight: Vector2D,BottomLeft: Vector2D}}
 */
export const Origin = {
    Center: Vector2D.FromValues(0.5, 0.5),
    TopLeft: Vector2D.FromValues(0, 0),
    TopRight: Vector2D.FromValues(1, 0),
    BottomRight: Vector2D.FromValues(1, 1),
    BottomLeft: Vector2D.FromValues(0, 1)
}

export class Toolkit {
    static IsNumber(value) {
        if (typeof value !== this.#Type.NUMBER) {
            throw new TypeError("Value must be a number");
        }
    }

    static IsString(value) {
        if (typeof value !== this.#Type.STRING) {
            throw new TypeError("Value must be a string");
        }
    }

    static IsObject(value) {
        if (typeof value !== this.#Type.OBJECT) {
            throw new TypeError("Value must be an object");
        }
    }

    static #Type = {
        NUMBER: 'number',
        STRING: "string",
        OBJECT: "object"
    }
}