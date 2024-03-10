export class QuadGeometry {
    constructor() {
        this.Position = [
            -0.5, -0.5, // x, y
            0.5, -0.5,
          -0.5, 0.5,
          -0.5, 0.5,
          0.5, 0.5,
            0.5, -0.5
        ];

        this.Colors = [
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
        ];

        this.TextureCoordinates = [
            0.0, 1.0, // u, v
            1.0, 1.0,
            0.0, 0.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0
        ];

    }
}