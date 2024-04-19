//ts-check
/**
 * Represents color RGB
 * @class
 */
export class Color {

    // private variables
    /** @type {number} */ #Red;
    /** @type {number} */ #Green;
    /** @type {number} */ #Blue;

    /**
     * Creates an instance of Color.
     * Takes a 0 to 1 value where 1 = 255 in RGB color
     * @param {number} red - Red channel
     * @param {number} green - Green channel
     * @param {number} blue - Blue channel
     */
    constructor(red = 1, green = 1, blue = 1) {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
    }

    get Red() {
        return this.#Red;
    }
    get Green() {
        return this.#Green;
    }
    get Blue() {
        return this.#Blue;
    }

    set Red(value) {
        if (this.#Red == value) {
            return;
        }

        this.#Red = value;
    }
    set Green(value) {
        if (this.#Green == value) {
            return;
        }

        this.#Green = value;
    }
    set Blue(value) {
        if (this.#Blue == value) {
            return;
        }

        this.#Blue = value;
    }
}