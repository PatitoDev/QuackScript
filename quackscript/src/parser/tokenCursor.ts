import { Token } from '../lexer';

export class TokenCursor {
    private cursor: number;
    private tokens:Array<Token>;

    constructor (tokens: Array<Token>) {
        this.tokens = tokens;
        this.cursor = 0;
    }

    public hasReachedEnd = () => (
        this.cursor >= this.tokens.length - 1
    );

    public getCursor = () => {
        return this.cursor;
    };

    public readCurrentToken = () => {
        return this.tokens[this.cursor];
    };

    public readCurrentTokenAndAdvanceByOne = () => {
        const currentToken = this.tokens[this.cursor];
        this.advanceCursor(1);
        return currentToken;
    };

    public advanceCursor = (amount: number) => {
        this.cursor += amount;
    };

    public lookAhead = (amount: number) => {
        return this.tokens[this.cursor + amount];
    };
}