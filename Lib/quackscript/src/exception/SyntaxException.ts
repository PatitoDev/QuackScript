import { Position } from '../types/Position';

export class SyntaxException {

    public placement: Position;

    public message: string;

    constructor(placement: Position, message:string){
        this.placement = placement;
        this.message = message;
    }

    toString() {
        return `Syntax Error: In line ${this.placement.line} at char ${this.placement.char} \n ${this.message}`;
    }
}