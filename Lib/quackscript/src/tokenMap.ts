import { TokenType } from './types';

export const jsReservedWords = [
    //'break',
    //'case',
    //'catch',
    //'class',
    //'continue',
    //'default',
    //'else', // otherwise
    //'export', // expose
    //'finally',
    //'for',
    //'import',
    //'new', // create
    //'switch',
    //'this',
    //'return',
    //'super',
    //'throw',
    //'try',
    //'typeof',
    'await', // wait
    //'async', // async 

    'const', // implemented
    'debugger',
    'delete',
    'do',
    'extends',
    //'false', // implemented
    'function', // implemented
    'if', // implemented
    'in',
    'instanceof',
    //'null',
    //'true',
    'var',
    //'void',
    'while',
    'with',
    'let',
    'static',
    'yield',
];


export const tokenMap: Partial<Record<TokenType, {
    regex: RegExp,
    js?: string,
}>> = {
    'COMMENT_SHORT': {
        regex: /^\/\/.*?\n/
    },
    'COMMENT_LONG': {
        regex: /^\/\*(\s|\S)*\*\//
    },
    'BREAK': {
        regex: /^break(?=[^a-zA-Z0-9]|$)/,
    },
    'ASYNC' : {
        regex: /^async(?=[^a-z-A-Z0-9]|$)/
    },
    'AWAIT' : {
        regex: /^wait(?=[^a-z-A-Z0-9]|$)/,
    },
    'CASE' : {
        regex: /^case(?=[^a-z-A-Z0-9]|$)/
    },
    'CATCH' : {
        regex: /^capture(?=[^a-z-A-Z0-9]|$)/,
    },
    'CLASS' : {
        regex: /^class(?=[^a-z-A-Z0-9]|$)/
    },
    'TYPEOF' : {
        regex: /^typeof(?=[^a-z-A-Z0-9]|$)/
    },
    'TRY' : {
        regex: /^try(?=[^a-z-A-Z0-9]|$)/
    },
    'THROW' : {
        regex: /^throw(?=[^a-z-A-Z0-9]|$)/
    },
    'THIS' : {
        regex: /^this(?=[^a-z-A-Z0-9]|$)/
    },
    'SWITCH' : {
        regex: /^switch(?=[^a-z-A-Z0-9]|$)/
    },
    'SUPER' : {
        regex: /^super(?=[^a-z-A-Z0-9]|$)/
    },
    'RETURN' : {
        regex: /^return(?=[^a-z-A-Z0-9]|$)/
    },
    'NEW' : {
        regex: /^new(?=[^a-z-A-Z0-9]|$)/
    },
    'CONTINUE' : {
        regex: /^continue(?=[^a-z-A-Z0-9]|$)/
    },
    'EXPORT' : {
        regex: /^export(?=[^a-z-A-Z0-9]|$)/
    },
    'FINALLY' : {
        regex: /^finally(?=[^a-z-A-Z0-9]|$)/
    },
    'DEFAULT' : {
        regex: /^default(?=[^a-z-A-Z0-9]|$)/
    },
    'ELSE' : {
        regex: /^else(?=[^a-z-A-Z0-9]|$)/
    },
    'FOR' : {
        regex: /^for(?=[^a-z-A-Z0-9]|$)/
    },
    'IMPORT' : {
        regex: /^import(?=[^a-z-A-Z0-9]|$)/
    },
    'NUMBER_VALUE':  {
        regex: /^[0-9]*\.?[0-9]*/,
    },
    'NUMBER_TYPE': {
        regex: /^number(?=[^a-z-A-Z0-9]|$)/
    },
    'WHITESPACE': {
        regex: /^[^\S\n]+/,
        js: ' ',
    },
    'NEW_LINE': {
        regex: /^\n/,
        js: ' ',
    },
    'TERMINATOR': {
        regex: /^🦆/,
        js: ';',
    },
    'SUBTRACTION': {
        regex: /^-/,
    },
    'MULTIPLICATION': {
        regex: /^\*/,
    },
    'ADDITION': {
        regex: /^\+/
    },
    'MODULUS': {
        regex: /^%/
    },
    'DIVISION': {
        regex: /^\//,
    },
    'ASSIGNMENT_LET': {
        regex: /^quack(?=[^a-zA-Z0-9]|$)/,
    } ,
    'ASSIGNMENT_CONST': {
        regex: /^QUACK(?=[^a-zA-Z0-9]|$)/,
    } ,
    'ASSIGNMENT_OPERATOR': {
        regex: /^<-/,
    },
    'ASSIGNMENT_OBJECT': {
        regex: /^<->/,
    } ,
    'BRACKET_OPEN': {
        regex: /^\(:/,
    },
    'BRACKET_CLOSE': {
        regex: /^:\)/,
    } ,
    'SQUARE_BRACKET_OPEN': {
        regex: /^\[:/,
    } ,
    'SQUARE_BRACKET_CLOSE': {
        regex: /^:\]/,
    } ,
    'CURLY_BRACKET_OPEN': {
        regex: /^{:/,
    } ,
    'CURLY_BRACKET_CLOSE': {
        regex: /^:}/,
    } ,
    'TEXT_VALUE': {
        regex: /^'.*?'/,
    },
    'COMMA': {
        regex: /^,/,
    },
    'ARROW_FUNCTION': {
        regex: /^:>/,
    } ,
    // check
    'AND': {
        regex: /^and(?=[^a-zA-Z0-9]|$)/,
    },
    'OR': {
        regex: /^or(?=[^a-zA-Z0-9]|$)/,
    },
    'LESS_THAN': {
        regex: /^lt(?=[^a-zA-Z0-9]|$)/,
    },
    'LESS_THAN_OR_EQUALS': {
        regex: /^leq(?=[^a-zA-Z0-9]|$)/,
    },
    'GREATER_THAN': {
        regex: /^gt(?=[^a-zA-Z0-9]|$)/,
    },
    'GREATER_THAN_OR_EQUALS': {
        regex: /^geq(?=[^a-zA-Z0-9]|$)/,
    },
    'NOT_EQUALS': {
        regex: /^nteq(?=[^a-zA-Z0-9]|$)/,
    },
    'EQUALS': {
        regex: /^eq(?=[^a-zA-Z0-9]|$)/,
    },
    'IF': {
        regex: /^when(?=[^a-zA-Z0-9]|$)/,
    },
    'THEN': {
        regex: /^then(?=[^a-zA-Z0-9]|$)/,
    },
    'TEXT_TYPE': {
        regex: /^text(?=[^a-zA-Z0-9]|$)/,
    },
    'BOOLEAN_VALUE': {
        regex: /^true|^false(?=[^a-zA-Z0-9]|$)/,
    },
    'BOOLEAN_TYPE': {
        regex: /^bool(?=[^a-zA-Z0-9]|$)/,
    },
    'NOTHING': {
        regex: /^nothing(?=[^a-zA-Z0-9]|$)/,
    },
    'VECTOR2': {
        regex: /^vector2(?=[^a-zA-Z0-9]|$)/,
    },
    'VECTOR3': {
        regex: /^vector3(?=[^a-zA-Z0-9]|$)/,
    },
    'FUNC': {
        regex: /^func(?=[^a-zA-Z0-9]|$)/,
    },
    'DOT': {
        regex: /^\./,
    },
    'QUESTION': {
        regex: /^\?/
    },
    'COLON': {
        regex: /^:/
    },
    'IDENTIFIER': {
        regex: /^[a-zA-Z_]+[a-zA-Z0-9_]*/,
    },
};