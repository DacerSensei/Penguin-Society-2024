import { Toolkit } from "./Toolkit.js";
/**
 * Represents a Rectangle in 2D space.
 * @class
 */
export class Rect {
    /**
     * Creates an instance of Rectangle.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} width - Width of the rectangle.
     * @param {number} height - Height of the rectangle.
     */
    constructor(x, y, width, height) {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }

    Copy() {
        return new Rect(this.X, this.Y, this.Width, this.Height);
    }

    #X;
    #Y;
    #Width;
    #Height;

    get X() {
        return this.#X;
    }

    set X(value) {
        if (this.#X == value) {
            return;
        }
        Toolkit.IsNumber(value);

        this.#X = value;
    }

    get Y() {
        return this.#Y;
    }

    set Y(value) {
        if (this.#Y == value) {
            return;
        }
        Toolkit.IsNumber(value);

        this.#Y = value;
    }

    get Width() {
        return this.#Width;
    }

    set Width(value) {
        if (this.#Width == value) {
            return;
        }
        Toolkit.IsNumber(value);

        this.#Width = value;
    }

    get Height() {
        return this.#Height;
    }

    set Height(value) {
        if (this.#Height == value) {
            return;
        }
        Toolkit.IsNumber(value);

        this.#Height = value;
    }
}