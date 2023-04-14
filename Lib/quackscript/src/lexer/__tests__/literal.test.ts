import Lexer  from '..';

describe('Lexer Literals - ', () => {

    const identifierValuesToTest: Array<{
        value: string,
        isValid: boolean
    }> = [
        { value: 'a123123', isValid: true },
        { value: 'a___a', isValid: true },
        { value: '_test', isValid: true },
        { value: '123test', isValid: false },
    ];
    test.each(identifierValuesToTest)('String literal: \'%s\'', ({ value, isValid }) => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens(value);
        const isEqual = (
            outcome[0]?.type === 'IDENTIFIER' &&
            outcome[0]?.value === value
        );
        expect(isEqual).toBe(isValid);
    });

    const numberValuesToTest: Array<{
        value: string,
        isValid: boolean
    }> = [
        { value: '2123123', isValid: true },
        { value: '123.123123', isValid: true },
        { value: '.1231', isValid: false },
        { value: '_123', isValid: false },
        { value: '123123_', isValid: false },
        { value: '123test', isValid: false },
    ];
    test.each(numberValuesToTest)('Number Literal: \'%s\'', ({ value, isValid }) => {
        const lexer = new Lexer();
        const outcome = lexer.convertToTokens(value);
        const isEqual = (
            outcome[0]?.type === 'NUMBER_VALUE' &&
            outcome[0]?.value === value
        );
        expect(isEqual).toBe(isValid);
    });
});