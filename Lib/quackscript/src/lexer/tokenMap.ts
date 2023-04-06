import { Lexemes } from './lexemes';

export const tokenMap: Record<Lexemes, RegExp> = {
    'COMMENT_SHORT': /^\/\/.*?\n/,

    'COMMENT_LONG': /^\/\*(\s|\S)*\*\//,

    'RETURN': /^return(?=[^a-z-A-Z0-9]|$)/,

    'NUMBER_VALUE': /^[0-9]*\.?[0-9]*/,

    'NUMBER_TYPE': /^number(?=[^a-z-A-Z0-9]|$)/,

    'WHITESPACE': /^[^\S\n]+/,

    'NEW_LINE': /^\n/,

    'TERMINATOR': /^🦆/,

    'SUBTRACTION': /^-/,

    'MULTIPLICATION': /^\*/,

    'ADDITION':  /^\+/,

    'MODULUS':  /^%/,

    'DIVISION': /^\//,

    'ASSIGNMENT_LET': /^quack(?=[^a-zA-Z0-9]|$)/,

    'ASSIGNMENT_CONST': /^QUACK(?=[^a-zA-Z0-9]|$)/,

    'ASSIGNMENT_OPERATOR': /^<-/,

    'BRACKET_OPEN': /^\(:/,

    'BRACKET_CLOSE': /^:\)/,

    'SQUARE_BRACKET_OPEN': /^\[:/,

    'SQUARE_BRACKET_CLOSE': /^:\]/,

    'CURLY_BRACKET_OPEN': /^{:/,

    'CURLY_BRACKET_CLOSE': /^:}/,

    'TEXT_VALUE': /^'.*?'/,

    'COMMA': /^,/,

    'ARROW_FUNCTION': /^:>/,

    'AND': /^&&/,

    'OR': /^\|\|/,

    'LESS_THAN_OR_EQUALS': /^<=/,

    'LESS_THAN': /^</,

    'GREATER_THAN_OR_EQUALS': /^>=/,

    'GREATER_THAN': /^>/,

    'NOT_EQUALS': /^!=/,

    'EQUALS': /^==/,

    'IF': /^if(?=[^a-zA-Z0-9]|$)/,

    'THEN': /^then(?=[^a-zA-Z0-9]|$)/,

    'ELSE': /^else(?=[^a-z-A-Z0-9]|$)/,

    'TEXT_TYPE': /^text(?=[^a-zA-Z0-9]|$)/,

    'BOOLEAN_VALUE': /^true|^false(?=[^a-zA-Z0-9]|$)/,

    'BOOLEAN_TYPE': /^bool(?=[^a-zA-Z0-9]|$)/,

    'NOTHING': /^nothing(?=[^a-zA-Z0-9]|$)/,

    'VECTOR2': /^vector2(?=[^a-zA-Z0-9]|$)/,

    'VECTOR3': /^vector3(?=[^a-zA-Z0-9]|$)/,

    'FUNC_TYPE': /^func(?=[^a-zA-Z0-9]|$)/,

    'DOT': /^\./,

    'QUESTION_MARK': /^\?/,

    'COLON': /^:/,

    'IDENTIFIER':  /^[a-zA-Z_]+[a-zA-Z0-9_]*/,
};