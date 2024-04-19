//ts-check
/**
 * Controller for the player
 * @class
 */
export class InputManager {
    constructor(){
        this.KeyDown = {};

        window.addEventListener("keydown", (e) => this.KeyDown[e.key] = true);
        window.addEventListener("keyup", (e) => this.KeyDown[e.key] = false);
    }

    IsKeyDown(key){
        return this.KeyDown[key];
    }

    IsKeyUp(key){
        return !this.KeyDown[key];
    }
}