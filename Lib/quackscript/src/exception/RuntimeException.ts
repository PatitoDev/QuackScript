import { Position } from '../types/Position';

export class RuntimeException {

    public code: string | null;

    public position: Position;

    public message: string;

    constructor(position: Position, message:string, code?: string | null){
        this.position = position;
        this.message = message;
        this.code = code ?? null;
    }

    toString() {
        let msg = `Runtime Error: In line ${this.position.line} at char ${this.position.lineChar}\n  ${this.message}`;

        if (this.code !== null) {
            console.log(this.position);
            const line = this.code.split('\n')[this.position.line - 1];
            if (line) {
                msg += `\n${line}\n`;
                msg += '^'.padStart(this.position.lineChar + 1);
            }
        }
        return msg;
    }
}