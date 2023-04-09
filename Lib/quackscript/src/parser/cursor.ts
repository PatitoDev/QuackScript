import { Token } from '../types/Token';

export class Cursor {
    private _position: number;
    private _tokens:Array<Token>;

    constructor (tokens: Array<Token>) {
        this._tokens = tokens;
        this._position = 0;
    }

    public hasReachedEnd = () => (
        this._position >= this._tokens.length - 1
    );

    public getPosition = () => {
        return this._position;
    };

    public readCurrentToken = () => {
        return this._tokens[this._position];
    };

    public readCurrentTokenAndAdvanceByOne = () => {
        const currentToken = this._tokens[this._position];
        this.advanceCursor(1);
        return currentToken;
    };

    public advanceCursor = (amount: number) => {
        this._position += amount;
    };

    public lookAhead = (amount: number) => {
        return this._tokens[this._position + amount];
    };
}