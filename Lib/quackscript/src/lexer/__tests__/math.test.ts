import Lexer  from '..';
import { Token } from '../../types/Token';

const valuesToTest: Array<{
    value: string,
    expected: Array<Token>
}> = [
    {
        value: '10*(5+2)',
        expected: [
            {
                position: {
                    globalChar: 1,
                    line: 1,
                    lineChar: 1
                },
                type: 'NUMBER_VALUE',
                value: '10'
            },
            {
                position: {
                    globalChar: 3,
                    line: 1,
                    lineChar: 3
                },
                type: 'MULTIPLICATION',
                value: '*'
            },
            {
                position: {
                    globalChar: 4,
                    line: 1,
                    lineChar: 4
                },
                type: 'BRACKET_OPEN',
                value: '('
            },
            {
                position: {
                    globalChar: 5,
                    line: 1,
                    lineChar: 5
                },
                type: 'NUMBER_VALUE',
                value: '5'
            },
            {
                position: {
                    globalChar: 6,
                    line: 1,
                    lineChar: 6
                },
                type: 'ADDITION',
                value: '+'
            },
            {
                position: {
                    globalChar: 7,
                    line: 1,
                    lineChar: 7
                },
                type: 'NUMBER_VALUE',
                value: '2'
            },
            {
                position: {
                    globalChar: 8,
                    line: 1,
                    lineChar: 8
                },
                type: 'BRACKET_CLOSE',
                value: ')'
            },
        ]
    },
    {
        value: '125+25.0/593*20<123',
        expected: [
            {
                position: {
                    globalChar: 1,
                    line: 1,
                    lineChar: 1
                },
                type: 'NUMBER_VALUE',
                value: '125'
            },
            {
                position: {
                    globalChar: 4,
                    lineChar: 4,
                    line: 1
                },
                type: 'ADDITION',
                value: '+'
            },
            {
                position: {
                    globalChar: 5,
                    lineChar: 5,
                    line: 1
                },
                type: 'NUMBER_VALUE',
                value: '25.0'
            },
            {
                position: {
                    globalChar: 9,
                    lineChar: 9,
                    line: 1
                },
                type: 'DIVISION',
                value: '/'
            },
            {
                position: {
                    globalChar: 10,
                    lineChar: 10,
                    line: 1
                },
                type: 'NUMBER_VALUE',
                value: '593'
            },
            {
                position: {
                    globalChar: 13,
                    lineChar: 13,
                    line: 1
                },
                type: 'MULTIPLICATION',
                value: '*'
            },
            {
                position: {
                    globalChar: 14,
                    lineChar: 14,
                    line: 1
                },
                type: 'NUMBER_VALUE',
                value: '20'
            },
            {
                position: {
                    globalChar: 16,
                    lineChar: 16,
                    line: 1
                },
                type: 'LESS_THAN',
                value: '<'
            },
            {
                position: {
                    globalChar: 17,
                    lineChar: 17,
                    line: 1
                },
                type: 'NUMBER_VALUE',
                value: '123'
            },
        ]
    },
    {
        value: '1 + 2',
        expected: [{
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
        }
        ]
    }
];


describe('Lexer Math - ', () => {

    test.each(valuesToTest)('Math expression: \'%s\'', ({ value, expected }) => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens(value);
        expect(outcome).toEqual(expected);
    });
});