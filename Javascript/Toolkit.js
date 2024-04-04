import * as vec2 from "../Library/Matrix/vec2.js";

export const Origin = {
    Center: vec2.fromValues(0.5, 0.5),
    TopLeft: vec2.fromValues(0, 0),
    TopRight: vec2.fromValues(1, 0),
    BottomRight: vec2.fromValues(1, 1),
    BottomLeft: vec2.fromValues(0, 1)
}