import * as mat4 from "../Library/Matrix/mat4.js";

export class Camera {
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