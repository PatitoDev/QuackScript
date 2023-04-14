import Lexer from '..';
import { Lexemes } from '../../types/Lexemes';
import { Token } from '../../types/Token';

describe('Lexemes - ', () => {
    const valuesToTest: Array<[string, Lexemes]> = [
        ['23', 'NUMBER_VALUE'],
        ['23.123', 'NUMBER_VALUE'],
        ['test', 'IDENTIFIER'],
        ['asd123', 'IDENTIFIER'],
        ['number', 'NUMBER_TYPE'],
        ['+', 'ADDITION'],
        ['-', 'SUBTRACTION'],
        ['>', 'GREATER_THAN'],
    ];
    test.each(valuesToTest)('can parse \'%s\'', (text, expected) => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens(text);
        expect(outcome).toEqual([{
            position: {
                lineChar: 1,
                line: 1,
                globalChar: 1,
            },
            type: expected,
            value: text
        }] as Array<Token>);
    });
});