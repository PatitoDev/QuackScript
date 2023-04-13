type LogicalOperatorLexemes = 'AND' |
    'OR';

type ComparisonOperatorLexemes = 'EQUALS' |
    'NOT_EQUALS' |
    'GREATER_THAN' |
    'LESS_THAN' |
    'GREATER_THAN_OR_EQUALS' |
    'LESS_THAN_OR_EQUALS';

type MathematicalLexemes = 'ADDITION' |
    'SUBTRACTION' |
    'MULTIPLICATION' |
    'MODULUS' |
    'DIVISION';

export type DataTypeLexemes = 'NOTHING' | 
    'FUNC_TYPE' |
    'BOOLEAN_TYPE' |
    'TEXT_TYPE' |
    'NUMBER_TYPE' |
    'OPTIONAL_TYPE';


export type DataValueLexemes = 'NOTHING' | 
    'BOOLEAN_VALUE' |
    'TEXT_VALUE' |
    'NUMBER_VALUE' |
    'VECTOR2' |
    'VECTOR3';

export type Lexemes = LogicalOperatorLexemes |
    ComparisonOperatorLexemes |
    MathematicalLexemes |
    DataValueLexemes |
    DataTypeLexemes |
    'IMPORT' |
    'ASSIGNMENT_OPERATOR' |
    'ARROW_FUNCTION' |
    'TERMINATOR' |
    'ASSIGNMENT_LET' |
    'ASSIGNMENT_CONST' |
    'IDENTIFIER' |
    'CURLY_BRACKET_OPEN' |
    'CURLY_BRACKET_CLOSE' |
    'SQUARE_BRACKET_OPEN' |
    'SQUARE_BRACKET_CLOSE' |
    'BRACKET_OPEN' |
    'BRACKET_CLOSE' |
    'COMMA' | 
    'IF' |
    'THEN' |
    'ELSE' |
    'RETURN' |
    'DOT' |
    'QUESTION_MARK' |
    'COLON' | 
    'WHITESPACE' |
    'NEW_LINE' |
    'COMMENT_SHORT' |
    'COMMENT_LONG';