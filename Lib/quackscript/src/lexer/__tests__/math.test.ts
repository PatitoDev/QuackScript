import Lexer, { Token }  from '..';

describe('Lexer Math - ', () => {

    test('can parse a single digit', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('1');
        expect(output).toEqual([{
            placement: {
                char: 0,
                line: 1,
                start: 0,
            },
            type: 'NUMBER',
            value: '1'
        }] as Array<Token>);
    });

    test('can parse a float', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('112312.1234102');
        expect(output).toEqual([{
            placement: {
                char: 0,
                line: 1,
                start: 0,
            },
            type: 'NUMBER',
            value: '112312.1234102'
        }] as Array<Token>);
    });

    test('can parse simple addition', () => {
        const lexer = new Lexer();
        const output = lexer.convertToTokens('1 + 2');
        expect(output).toEqual([
            {
                placement: {
                    char: 0,
                    line: 1,
                    start: 0,
                },
                type: 'NUMBER',
                value: '1'
            },
            {
                placement: {
                    char: 1,
                    line: 1,
                    start: 1,
                },
                type: 'WHITESPACE',
                value: ' '
            },
            {
                placement: {
                    char: 2,
                    line: 1,
                    start: 2,
                },
                type: 'ADDITION',
                value: '+'
            },
            {
                placement: {
                    char: 3,
                    line: 1,
                    start: 3,
                },
                type: 'WHITESPACE',
                value: ' '
            },
            {
                placement: {
                    char: 4,
                    line: 1,
                    start: 4,
                },
                type: 'NUMBER',
                value: '2'
            },
        ] as Array<Token>);
    });
});