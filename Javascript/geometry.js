export class QuadGeometry {
    constructor() {
        this.Position = [
            -0.5, -0.5, // x, y
            0.5, -0.5,
            -0.5, 0.5,
            0.5, 0.5,
        ];

        this.Colors = [
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
            1.0, 1.0, 1.0,  // r g b 
        ];

        this.TextureCoordinates = [
            0.0, 1.0, // u, v
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
        ];

        this.Indices = [
            0, 1, 2,
            1, 2, 3
        ]

    }
}