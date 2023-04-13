import Lexer  from '..';
import { Token } from '../../types/Token';

describe('Lexer Math - ', () => {

    test('can parse a single digit', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('1');
        expect(output).toEqual([{
            position: {
                char: 1,
                line: 1,
                start: 1,
            },
            type: 'NUMBER_VALUE',
            value: '1'
        }] as Array<Token>);
    });

    test('can parse a float', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('112312.1234102');
        expect(output).toEqual([{
            position: {
                char: 1,
                line: 1,
                start: 1,
            },
            type: 'NUMBER_VALUE',
            value: '112312.1234102'
        }] as Array<Token>);
    });

    test('can parse simple addition', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('1 + 2');
        expect(output).toEqual([
            {
                position: {
                    char: 1,
                    line: 1,
                    start: 1,
                },
                type: 'NUMBER_VALUE',
                value: '1'
            },
            {
                position: {
                    char: 2,
                    line: 1,
                    start: 2,
                },
                type: 'WHITESPACE',
                value: ' '
            },
            {
                position: {
                    char: 3,
                    line: 1,
                    start: 3,
                },
                type: 'ADDITION',
                value: '+'
            },
            {
                position: {
                    char: 4,
                    line: 1,
                    start: 4,
                },
                type: 'WHITESPACE',
                value: ' '
            },
            {
                position: {
                    char: 5,
                    line: 1,
                    start: 5,
                },
                type: 'NUMBER_VALUE',
                value: '2'
            },
        ] as Array<Token>);
    });
});