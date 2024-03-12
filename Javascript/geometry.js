export class QuadGeometry {
    constructor() {
        const x = 0, y = 0, width = 16 * 3, height = 16 * 3;

        this.Vertices = [
            // x y                     u    v    r    g    b 
            x, y,                      0.0, 0.0, 1.0, 1.0, 1.0, // top left 
            x + height, y,             1.0, 0.0, 1.0, 1.0, 1.0, // top right
            x + width, y + height,     1.0, 1.0, 1.0, 1.0, 1.0, // bottom right
            x, x + width,              0.0, 1.0, 1.0, 1.0, 1.0, // bottom left 
        ];

        this.Indices = [
            0, 1, 2,
            0, 2, 3
        ]
    }

    RenderMap(width, height){
        return [
            // x y                     u    v    r    g    b 
            x, y,                      0.0, 0.0, 1.0, 1.0, 1.0, // top left 
            x + height, y,             1.0, 0.0, 1.0, 1.0, 1.0, // top right
            x + width, y + height,     1.0, 1.0, 1.0, 1.0, 1.0, // bottom right
            x, x + width,              0.0, 1.0, 1.0, 1.0, 1.0, // bottom left 
        ];
    }
}