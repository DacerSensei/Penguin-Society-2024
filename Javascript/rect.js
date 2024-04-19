/**
 * Represents a Rectangle in 2D space.
 * @class
 */
export class Rect {

    // private variables
    /** @type {Number} */ #X;
    /** @type {Number} */ #Y;
    /** @type {Number} */ #Width;
    /** @type {Number} */ #Height;

    /**
     * Creates an instance of Rectangle.
     * @param {Number} x - The x-coordinate.
     * @param {Number} y - The y-coordinate.
     * @param {Number} width - Width of the rectangle.
     * @param {Number} height - Height of the rectangle.
     */
    constructor(x, y, width, height) {
        this.#X = x;
        this.#Y = y;
        this.#Width = width;
        this.#Height = height;
    }

    Copy() {
        return new Rect(this.X, this.Y, this.Width, this.Height);
    }

    get X() {
        return this.#X;
    }

    set X(value) {
        if (this.#X == value) {
            return;
        }

        this.#X = value;
    }

    get Y() {
        return this.#Y;
    }

    set Y(value) {
        if (this.#Y == value) {
            return;
        }

        this.#Y = value;
    }

    get Width() {
        return this.#Width;
    }

    set Width(value) {
        if (this.#Width == value) {
            return;
        }

        this.#Width = value;
    }

    get Height() {
        return this.#Height;
    }

    set Height(value) {
        if (this.#Height == value) {
            return;
        }

        this.#Height = value;
    }
}