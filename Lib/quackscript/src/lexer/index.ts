import { SyntaxException } from '../exception/SyntaxException';
import { Lexemes } from '../types/Lexemes';
import { Position } from '../types/Position';
import { Token } from '../types/Token';
import { tokenMap } from './tokenMap';

class ErrorHandler {
    private _errorStack: Array<SyntaxException> = [];
    private _currentError?: {
        startPosition: Position,
        endPosition: Position,
        value: string
    } | null;

    public pushError(position: Position, value: string) {
        if (this._currentError) {
            this._currentError.endPosition = { ...position };
            this._currentError.value = this._currentError.value.concat(value);
            return;
        }
        this._currentError = {
            endPosition: { ...position },
            startPosition: { ...position },
            value
        };
    }

    public clearCurrentError() {
        if (!this._currentError) return;

        this._errorStack.push(
            new SyntaxException(this._currentError.startPosition, 
                `Invalid character '${this._currentError.value}'`
            )
        );

        this._currentError = null;
    }

    public combineErrors(): string | undefined {
        this.clearCurrentError();
        if (!this._errorStack.length) return;
        console.log(this._errorStack);
        return this._errorStack.join('\n\n');
    }
}

export default class Lexer {
    private _position: Position;
    private _tokens: Array<Token>;
    private _errorHandler: ErrorHandler;

    constructor() {
        this._position = {
            lineChar: 1,
            line: 1,
            globalChar: 1 // cursor
        };
        this._tokens = [];
        this._errorHandler = new ErrorHandler();
    }

    public convertToTokens(code: string): Array<Token> {
        this._errorHandler = new ErrorHandler();
        this._tokens = [];
        this._position = {
            lineChar: 1,
            line: 1,
            globalChar: 1
        };

        const tokenKeys = Object.keys(tokenMap) as Array<Lexemes>;
        tokenLoop:while (code.length) {
            for (const tokenKey of tokenKeys) {
                const result = this.parseToken(code, tokenKey);
                if (!result) continue;
                this._errorHandler.clearCurrentError();
                this._tokens.push({
                    type: result.token,
                    value: result.value,
                    position: { ...this._position },
                });
                this._position.lineChar += result.value.length;
                this._position.globalChar += result.value.length;

                if (result.token === 'NEW_LINE') {
                    this._position.lineChar = 1;
                    this._position.line += 1;
                }

                code = result.splicedCode;
                continue tokenLoop;
            }

            const currentToken = code[0]; 
            if (currentToken?.length) {
                this._errorHandler.pushError(this._position, currentToken);
                this._position.lineChar += 1;
                this._position.globalChar += 1;
            }
            code = code.substring(1);
        }

        const errors = this._errorHandler.combineErrors();
        if (errors) {
            throw new Error(errors);
        }

        return this._tokens;
    }

    private parseToken = (data: string, token: Lexemes) => {
        const regexToExecute = tokenMap[token];
        if (!regexToExecute) return;

        const result = this.extractTokenWithRegex(data, regexToExecute);
        if (!result) return;

        if (token === 'TEXT_VALUE' && result.matchedValue) {
            result.matchedValue = result.matchedValue.replace(/'|"/g, '');
        }

        return {
            token,
            value: result.matchedValue,
            splicedCode: result.splicedCode
        };
    };

    private extractTokenWithRegex = (code: string, regexList: Array<RegExp>) => {
        for (const regex of regexList) {
            const result = regex.exec(code);
            if (!result || !result[0]) continue;
            const matchedValue = result?.['groups']?.['target'] ?? result[0];
            const splicedCode = code.substring(matchedValue.length);

            return { matchedValue, splicedCode };
        }
    };
}