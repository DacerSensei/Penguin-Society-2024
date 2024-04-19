import { Origin } from "./Toolkit.js";
import * as Vector2D from "./Matrix/Vector2D.js";
/**
 * Represents a Rotation in 2D space.
 * @class
 */
export class Rotation {

    // private variables
    /** @type {number} */ #Degree;
    /** @type {Vector2D} */ #RotationOrigin;

    /**
     * Creates an instance of Rotation.
     * @param {number} degree - Angle Degree.
     * @param {Vector2D} rotationOrigin - Anchor.
     */
    constructor(degree, rotationOrigin = Origin.Center){
        this.#Degree = degree * Math.PI / 180;
        this.#RotationOrigin = rotationOrigin;
    }

    get Degree(){
        return this.#Degree;
    }
    get RotationOrigin(){
        return this.#RotationOrigin;
    }

    set Degree(value){
        if (this.#Degree == value) {
            return;
        }

        this.#Degree = value;
    }
}