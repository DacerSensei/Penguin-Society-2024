import { Rect } from "../Rect.js";
import { Content } from "../Content.js";
import { Color } from "../Color.js";
import * as vec2 from "../../Library/Matrix/vec2.js";
import { Rotation } from "../Rotation.js";
import { Origin } from "../Toolkit.js";

const SPEED = 0.25;

export class Player {

    #InputManager;
    #MovementDirection;
    #Texture;
    #SourceRect;
    #DrawRect;

    constructor(inputManager) {
        this.#InputManager = inputManager;
        this.#MovementDirection = vec2.create();

        const playerSprite = Content.Sprites["CharacterWhite"];
        this.#Texture = playerSprite.Texture;
        this.#SourceRect = playerSprite.SourceRect.Copy();
        this.#DrawRect = playerSprite.DrawRect.Copy();
    }

    Update(deltaTime) {
        this.#MovementDirection[0] = 0;
        this.#MovementDirection[1] = 0;

        if (this.#InputManager.IsKeyDown("ArrowLeft")) {
            this.#MovementDirection[0] = -1;

        } else if (this.#InputManager.IsKeyDown("ArrowRight")) {
            this.#MovementDirection[0] = 1;

        }
        if (this.#InputManager.IsKeyDown("ArrowUp")) {
            this.#MovementDirection[1] = -1;
        } else if (this.#InputManager.IsKeyDown("ArrowDown")) {
            this.#MovementDirection[1] = 1;
        }

        vec2.normalize(this.#MovementDirection, this.#MovementDirection);
        this.#DrawRect.X += this.#MovementDirection[0] * SPEED * deltaTime;
        this.#DrawRect.Y += this.#MovementDirection[1] * SPEED * deltaTime;
    }
    Rotation = new Rotation(0, Origin.Center);
    Draw(spriteRenderer) {
        const resize = new Rect(this.#DrawRect.X, this.#DrawRect.Y, 96, 96);
        this.Rotation.Degree += .001;
        console.log(this.Rotation.Degree);
        spriteRenderer.DrawSpriteSource(this.#Texture, resize, this.#SourceRect, undefined, this.Rotation);
    }
}