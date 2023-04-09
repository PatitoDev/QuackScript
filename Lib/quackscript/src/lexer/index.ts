import { Lexemes } from '../types/Lexemes';
import { Token } from '../types/Token';
import { tokenMap } from './tokenMap';


export default class Lexer {

    public convertToTokens = (code: string) => {
        const generatedTokens:Array<Token> = [];

        let nextData = code;
        let hasMoreToParse = true;
        let cursor = 0;
        let currentLine = 1;
        let currentCharacter = 0;

        while(hasMoreToParse) {
            if (nextData.length == 0) {
                break;
            }

            hasMoreToParse = false;

            for (const tokenType of Object.keys(tokenMap)) {
                const result = this.parseToken(nextData, tokenType as Lexemes);
                if (result) {
                    generatedTokens.push({
                        type: result.token,
                        value: result.value,
                        position: {
                            start: cursor,
                            char: currentCharacter,
                            line: currentLine,
                        }
                    });
                    cursor += result.value.length;
                    currentCharacter += result.value.length;

                    if (result.token === 'NEW_LINE') {
                        currentCharacter = 0;
                        currentLine += 1;
                    }

                    nextData = result.splicedCode;
                    hasMoreToParse = true;
                    break;
                }
            }

            if (!hasMoreToParse) {
                throw new Error(`Invalid character found at line: ${currentLine} char: ${currentCharacter}`);
            }
        }

        return generatedTokens;
    };

    private parseToken = (data: string, token: Lexemes) => {
        const regexToExecute = tokenMap[token];
        if (regexToExecute) {
            const result = this.extractTokenWithRegex(data, regexToExecute);
            if (token === 'TEXT_VALUE' && result?.matchedValue) {
                // TODO - find a better way of doing this
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