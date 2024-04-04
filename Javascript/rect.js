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
    constructor(x, y, width, height){
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }

    Copy(){
        return new Rect(this.X, this.Y, this.Width, this.Height);
    }
}