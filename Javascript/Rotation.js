import { Toolkit } from "./Toolkit.js";

export class Rotation {

    #Degree;
    #RotationOrigin;

    constructor(degree, rotationOrigin = null){
        this.#Degree = degree;
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
        Toolkit.IsNumber(value);

        this.#Degree = value;
    }
}