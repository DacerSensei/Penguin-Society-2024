import { Rect } from "../Rect.js";
import { Content } from "../Content.js";
import { Color } from "../Color.js";
import * as Vector2D from "../Matrix/Vector2D.js";
import { Rotation } from "../Rotation.js";
import { Origin } from "../Toolkit.js";
import { InputManager } from "../InputManager.js";
import { Texture } from "../Texture.js";

/**
 * Represents player in the game
 * @class
 */
export class Player {

    /** @type {InputManager} */ #InputManager;
    /** @type {Vector2D} */ #MovementDirection;
    /** @type {Texture} */ #Texture;
    /** @type {Rect} */ #SourceRect;
    /** @type {Rect} */ #DrawRect;
    /** @type {number} */ #Speed = 0.25;

    /**
    * Create an instance of player
    * @param {InputManager} inputManager - InputManager to control player
    */
    constructor(inputManager) {
        this.#InputManager = inputManager;
        this.#MovementDirection = Vector2D.Create();

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

        Vector2D.Normalize(this.#MovementDirection, this.#MovementDirection);
        this.#DrawRect.X += this.#MovementDirection[0] * this.#Speed * deltaTime;
        this.#DrawRect.Y += this.#MovementDirection[1] * this.#Speed * deltaTime;
    }

    Rotation = new Rotation(0, Origin.Center);

    Draw(spriteRenderer) {
        this.Rotation.Degree += 0.02;
        const resize = new Rect(this.#DrawRect.X, this.#DrawRect.Y, 96, 96);
        spriteRenderer.DrawSpriteSource(this.#Texture, resize, this.#SourceRect, undefined, this.Rotation);
    }

    get Speed() {
        return this.#Speed;
    }
}