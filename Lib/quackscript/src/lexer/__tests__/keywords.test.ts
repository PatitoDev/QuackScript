import Lexer  from '..';
import { Lexemes } from '../../types/Lexemes';

describe('Keywords - ', () => {

    const keywordValuesToTest: Array<{
        value: string,
        expectedType: Lexemes,
        isValid: boolean
    }> = [
        { value: 'return', expectedType: 'RETURN', isValid: true },
        { value: 'returnTest', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'if', expectedType: 'IF', isValid: true },
        { value: 'ifA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'then', expectedType: 'THEN', isValid: true },
        { value: 'thenA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'else', expectedType: 'ELSE', isValid: true },
        { value: 'elseA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'optional', expectedType: 'OPTIONAL_TYPE', isValid: true },
        { value: 'optionalA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'number', expectedType: 'NUMBER_TYPE', isValid: true },
        { value: 'numberA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'text', expectedType: 'TEXT_TYPE', isValid: true },
        { value: 'textA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'boolean', expectedType: 'BOOLEAN_TYPE', isValid: true },
        { value: 'booleanA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'nothing', expectedType: 'NOTHING', isValid: true },
        { value: 'nothingA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'vector2', expectedType: 'VECTOR2', isValid: true },
        { value: 'vector2A', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'vector3', expectedType: 'VECTOR3', isValid: true },
        { value: 'vector3a', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'func', expectedType: 'FUNC_TYPE', isValid: true },
        { value: 'funcA', expectedType: 'IDENTIFIER', isValid: true },
        { value: 'import', expectedType: 'IMPORT', isValid: true },
        { value: 'importA', expectedType: 'IDENTIFIER', isValid: true },
    ];

    test.each(keywordValuesToTest)('Keyword: \'%s\'', ({ value, isValid, expectedType }) => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens(value);
        const isEqual = (
            outcome[0]?.type === expectedType &&
            outcome[0]?.value === value
        );
        expect(isEqual).toBe(isValid);
    });

});