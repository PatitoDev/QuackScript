import Lexer, { Token } from '../lexer';
import { tokenMap } from '../tokenMap';

export default class Transpiler {
    private _lexer:Lexer;
    
    constructor(){
        this._lexer = new Lexer();
    }
    
    public transpile = (input: string) => {
        const returnedData = this._lexer.convertToTokens(input);
        return this.tokenToJs(returnedData);
    };

    private tokenToJs = (tokenList: Array<Token>) => {
        let output = '';

        for (const { type, value } of tokenList){
            // if its a reserved word we modify it
            if (type === 'JS_RESERVED_WORD') {
                output += '_DUCK_INTERNAL_129310239012401241_1231312_' + value;
                continue;
            }

            const mappedValue = tokenMap[type]?.js;
            if (mappedValue) {
                output += mappedValue;
                continue;
            }
            output += value;
        }

        return output;
    };
}