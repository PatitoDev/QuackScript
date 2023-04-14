import Lexer  from '..';
import { Token } from '../../types/Token';

describe('Lexer Math - ', () => {

    test('can parse a single digit', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('1');
        expect(output).toEqual([{
            position: {
                lineChar: 1,
                line: 1,
                globalChar: 1,
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
                lineChar: 1,
                line: 1,
                globalChar: 1,
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
                    lineChar: 1,
                    line: 1,
                    globalChar: 1,
                },
                type: 'NUMBER_VALUE',
                value: '1'
            },
            {
                position: {
                    lineChar: 2,
                    line: 1,
                    globalChar: 2,
                },
                type: 'WHITESPACE',
                value: ' '
            },
            {
                position: {
                    lineChar: 3,
                    line: 1,
                    globalChar: 3,
                },
                type: 'ADDITION',
                value: '+'
            },
            {
                position: {
                    lineChar: 4,
                    line: 1,
                    globalChar: 4,
                },
                type: 'WHITESPACE',
                value: ' '
            },
            {
                position: {
                    lineChar: 5,
                    line: 1,
                    globalChar: 5,
                },
                type: 'NUMBER_VALUE',
                value: '2'
            },
        ] as Array<Token>);
    });
});