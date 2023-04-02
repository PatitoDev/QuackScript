import Lexer, { Token } from '..';

describe('Lexer Identifiers - ', () => {
    test('can parse a single char', () => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens('a');
        expect(outcome).toEqual([{
            placement: {
                char: 0,
                line: 1,
                start: 0,
            },
            type: 'IDENTIFIER',
            value: 'a'
        }] as Array<Token>);
    });
});