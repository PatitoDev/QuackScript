import Lexer from '..';
import { Lexemes } from '../../types/Lexemes';
import { Token } from '../../types/Token';

describe('Lexemes - ', () => {
    const valuesToTest: Array<
    {
        value: string,
        expectedType: Lexemes,
        expectedParsedValue?: string
    }
    > = [
        { value: '23', expectedType: 'NUMBER_VALUE' },
        { value: '23.123', expectedType: 'NUMBER_VALUE' },
        { value: 'test', expectedType: 'IDENTIFIER' },
        { value: 'asd123', expectedType: 'IDENTIFIER' },
        { value: 'number', expectedType: 'NUMBER_TYPE' },
        { value: '+', expectedType: 'ADDITION' },
        { value: '-', expectedType: 'SUBTRACTION' },
        { value: '>', expectedType: 'GREATER_THAN' },
        { value: '+', expectedType: 'ADDITION' },
        { value: '-', expectedType: 'SUBTRACTION' },
        { value: '*', expectedType: 'MULTIPLICATION' },
        { value: '%', expectedType: 'MODULUS' },
        { value: '/', expectedType: 'DIVISION' },
        { value: 'quack', expectedType: 'ASSIGNMENT_LET' },
        { value: 'QUACK', expectedType: 'ASSIGNMENT_CONST' },
        { value: '<-', expectedType: 'ASSIGNMENT_OPERATOR' },
        { value: '(', expectedType: 'BRACKET_OPEN' },
        { value: ')', expectedType: 'BRACKET_CLOSE' },
        { value: '[', expectedType: 'SQUARE_BRACKET_OPEN' },
        { value: ']', expectedType: 'SQUARE_BRACKET_CLOSE' },
        { value: '{', expectedType: 'CURLY_BRACKET_OPEN' },
        { value: '}', expectedType: 'CURLY_BRACKET_CLOSE' },
        { value: '\'test\'', expectedType: 'TEXT_VALUE', expectedParsedValue: 'test' },
        { value: '"test"', expectedType: 'TEXT_VALUE', expectedParsedValue: 'test' },
        { value: ',', expectedType: 'COMMA' },
        { value: '&&', expectedType: 'AND' },
        { value: '||', expectedType: 'OR' },
        { value: '<=', expectedType: 'LESS_THAN_OR_EQUALS' },
        { value: '<', expectedType: 'LESS_THAN' },
        { value: '>=', expectedType: 'GREATER_THAN_OR_EQUALS' },
        { value: '>', expectedType: 'GREATER_THAN' },
        { value: '!=', expectedType: 'NOT_EQUALS' },
        { value: '==', expectedType: 'EQUALS' },
        { value: 'if', expectedType: 'IF' },
        { value: 'then', expectedType: 'THEN' },
        { value: 'else', expectedType: 'ELSE' },
        { value: 'optional', expectedType: 'OPTIONAL_TYPE' },
        { value: 'number', expectedType: 'NUMBER_TYPE' },
        { value: 'text', expectedType: 'TEXT_TYPE' },
        { value: 'true', expectedType: 'BOOLEAN_VALUE' },
        { value: 'false', expectedType: 'BOOLEAN_VALUE' },
        { value: 'boolean', expectedType: 'BOOLEAN_TYPE' },
        { value: 'nothing', expectedType: 'NOTHING' },
        { value: 'vector2', expectedType: 'VECTOR2' },
        { value: 'vector3', expectedType: 'VECTOR3' },
        { value: 'func', expectedType: 'FUNC_TYPE' },
        { value: 'import', expectedType: 'IMPORT' },
        { value: '.', expectedType: 'DOT' },
        { value: '?', expectedType: 'QUESTION_MARK' },
        { value: ':', expectedType: 'COLON' },
        { value: '// This is a comment', expectedType: 'COMMENT_SHORT' }, 
        { value: '// This is a comment \n', expectedType: 'COMMENT_SHORT' }, 
        { value: '/* This is a comment */', expectedType: 'COMMENT_LONG' },
        { value: '/* This is a comment \n\n\n */', expectedType: 'COMMENT_LONG' },
        { value: 'return', expectedType: 'RETURN' },
        { value: '\n', expectedType: 'NEW_LINE' },
        { value: '🦆', expectedType: 'TERMINATOR' }
    ];
    test.each(valuesToTest)('can parse \'%s\'', ({ expectedType, value, expectedParsedValue}) => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens(value);
        expect(outcome).toEqual([{
            position: {
                lineChar: 1,
                line: 1,
                globalChar: 1,
            },
            type: expectedType,
            value: expectedParsedValue ?? value
        }] as Array<Token>);
    });
});