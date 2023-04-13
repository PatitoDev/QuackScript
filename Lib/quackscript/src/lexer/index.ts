import { SyntaxException } from '../exception/SyntaxException';
import { Lexemes } from '../types/Lexemes';
import { Position } from '../types/Position';
import { Token } from '../types/Token';
import { tokenMap } from './tokenMap';


export default class Lexer {
    private _position: Position;
    private _tokens: Array<Token>;

    constructor() {
        this._position = {
            char: 1,
            line: 1,
            start: 1 // cursor
        };
        this._tokens = [];
    }

    public convertToTokens(code: string): Array<Token> {
        this._tokens = [];
        this._position = {
            char: 1,
            line: 1,
            start: 1
        };

        const tokenKeys = Object.keys(tokenMap);
        let codeToInspect = code;

        if (code.trim().length === 0) return [];

        tokenLoop:while (codeToInspect.length) {
            try {
                for (const tokenKey of tokenKeys) {
                    const result = this.parseToken(codeToInspect, tokenKey as Lexemes);
                    if (result) {
                        this._tokens.push({
                            type: result.token,
                            value: result.value,
                            position: { ...this._position },
                        });
                        this._position.char += result.value.length;
                        this._position.start += result.value.length;

                        if (result.token === 'NEW_LINE') {
                            this._position.char = 0;
                            this._position.line += 1;
                        }

                        codeToInspect = result.splicedCode;
                        continue tokenLoop;
                    }
                }

                // TODO - ignore character and carry on
                throw new SyntaxException(this._position, `Invalid character ${codeToInspect[0]}`);
            } catch (err) {
                // TODO - handle error gracefully
                if (err instanceof SyntaxException) {
                    throw new Error(err.toString());
                } else {
                    throw err;
                }
            }
        }

        return this._tokens;
    }

    private parseToken = (data: string, token: Lexemes) => {
        const regexToExecute = tokenMap[token];
        if (regexToExecute) {
            const result = this.extractTokenWithRegex(data, regexToExecute);
            if (token === 'TEXT_VALUE' && result?.matchedValue) {
                result.matchedValue = result.matchedValue.replace(/'/g, '');
            }
            if (result) {
                return {
                    token,
                    value: result.matchedValue,
                    splicedCode: result.splicedCode
                };
            }
        }
        return null;
    };

    private extractTokenWithRegex = (code: string, regex: RegExp) => {
        const result = regex.exec(code);
        if (!result || !result[0]) return null;
        const matchedValue = result?.['groups']?.['target'] ?? result[0];
        const splicedCode = code.substring(matchedValue.length);

        return { matchedValue, splicedCode };
    };
}