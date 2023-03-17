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
    'BREAK': {
        regex: /^break(?=[^a-zA-Z0-9]|$)/,
    },
    'ASYNC' : {
        regex: /^async(?=[^a-z-A-Z0-9]|$)/
    },
    'AWAIT' : {
        regex: /^wait(?=[^a-z-A-Z0-9]|$)/,
        js: 'await',
    },
    'CASE' : {
        regex: /^case(?=[^a-z-A-Z0-9]|$)/
    },
    'CATCH' : {
        regex: /^capture(?=[^a-z-A-Z0-9]|$)/,
        js: 'catch'
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
    'PRINT': {
        js: 'console.log',
        regex: /^quackprint(?=[^a-zA-Z0-9]|$)/
    },
    'NUMBER':  {
        regex: /^[0-9]*\.?[0-9]*/,
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
        js: 'let'
    } ,
    'ASSIGNMENT_CONST': {
        regex: /^QUACK(?=[^a-zA-Z0-9]|$)/,
        js: 'const',
    } ,
    'ASSIGNMENT': {
        regex: /^<->/,
        js: '=',
    },
    'ASSIGNMENT_OBJECT': {
        regex: /^<-/,
        js: ':',
    } ,
    'BRACKET_OPEN': {
        regex: /^\(:/,
        js: '('
    },
    'BRACKET_CLOSE': {
        regex: /^:\)/,
        js: ')'
    } ,
    'SQUARE_BRACKET_OPEN': {
        regex: /^\[:/,
        js: '['
    } ,
    'SQUARE_BRACKET_CLOSE': {
        regex: /^:\]/,
        js: ']',
    } ,
    'CURLY_BRACKET_OPEN': {
        regex: /^{:/,
        js: '{'
    } ,
    'CURLY_BRACKET_CLOSE': {
        regex: /^:}/,
        js: '}'
    } ,
    'TEXT': {
        regex: /^'.*?'/,
    },
    'COMMA': {
        regex: /^,/,
        js: ','
    },
    'ARROW_FUNCTION': {
        regex: /^:>/,
        js: '=>'
    } ,
    // check
    'AND': {
        regex: /^and(?=[^a-zA-Z0-9]|$)/,
        js: '&&'
    },
    'OR': {
        regex: /^or(?=[^a-zA-Z0-9]|$)/,
        js: '||'
    },
    'LESS_THAN': {
        regex: /^lt(?=[^a-zA-Z0-9]|$)/,
        js: '<'
    },
    'LESS_THAN_OR_EQUALS': {
        regex: /^leq(?=[^a-zA-Z0-9]|$)/,
        js: '<='
    },
    'GREATER_THAN': {
        regex: /^gt(?=[^a-zA-Z0-9]|$)/,
        js: '>'
    },
    'GREATER_THAN_OR_EQUALS': {
        regex: /^geq(?=[^a-zA-Z0-9]|$)/,
        js: '>='
    },
    'NOT_EQUALS': {
        regex: /^nteq(?=[^a-zA-Z0-9]|$)/,
        js: '!=='
    },
    'EQUALS': {
        regex: /^eq(?=[^a-zA-Z0-9]|$)/,
        js: '==='
    },
    'IF': {
        regex: /^when(?=[^a-zA-Z0-9]|$)/,
        js: 'if'
    },
    'THEN': {
        regex: /^then(?=[^a-zA-Z0-9]|$)/,
        js: ' ',
    },
    'IDENTIFIER': {
        regex: /^[a-zA-Z_]+[a-zA-Z0-9_]*/,
    },
};