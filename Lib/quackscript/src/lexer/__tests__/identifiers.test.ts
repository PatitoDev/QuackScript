import Lexer  from '..';
import { Token } from '../../types/Token';

describe('Lexer Identifiers - ', () => {
    test('can parse a single char', () => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens('a');
        expect(outcome).toEqual([{
            position: {
                char: 1,
                line: 1,
                start: 1,
            },
            type: 'IDENTIFIER',
            value: 'a'
        }] as Array<Token>);
    });
});