import { randomUUID } from "crypto";

export abstract class Base {
    private _id: string;
  
    constructor() {
        this._id = randomUUID();
    }

    //Getter
    public get id(): string {
        return this._id; 
    }
}

