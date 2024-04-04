export class Color {
    /**
     * Creates an instance of Color.
     * Takes a 0 to 1 value where 1 = 255 in RGB color
     * @param {float} red - Red channel
     * @param {float} green - Green channel
     * @param {float} blue - Blue channel
     */
    constructor(red = 1, green = 1, blue = 1){
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
    }
}