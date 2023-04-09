import { Position } from '../types/Position';

export class ParsingException {

    public placement: Position;

    public message: string;

    constructor(placement: Position, message:string){
        this.placement = placement;
        this.message = message;
    }

    toString() {
        return `Error: In line ${this.placement.line} at char ${this.placement.char} \n ${this.message}`;
    }
}