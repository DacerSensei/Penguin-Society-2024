import * as mat4 from "../Library/Matrix/mat4.js";
/**
 * Represents a Camera in 2D space.
 * @class
 */
export class Camera {
    /**
     * Creates an instance of Camera.
     * @param {number} width - Width of the camera.
     * @param {number} height - Height of the camera.
     */
    constructor(width, height){
        this.Width = width;
        this.Height = height;
        this.ProjectionViewMatrix = mat4.create();
    }
    
    Update(){
        this.Projection = mat4.ortho(mat4.create(), 0, this.Width, this.Height, 0, -1, 1);
        this.View = mat4.lookAt(mat4.create(), [0,0,1], [0,0,0], [0,1,0]);

        mat4.multiply(this.ProjectionViewMatrix, this.Projection, this.View);

    }
}