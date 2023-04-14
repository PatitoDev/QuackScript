import { Position } from '../types/Position';

export class ParseException {

    public placement: Position;

    public message: string;

    constructor(placement: Position, message:string){
        this.placement = placement;
        this.message = message;
    }

    toString() {
        return `Parse Error: In line ${this.placement.line} at char ${this.placement.lineChar} \n ${this.message}`;
    }
}