import { Token } from '../../types/Token';
import { Cursor } from '../Cursor';
import { AssignmentOperatorNode, BooleanLiteralNode, DataTypeNode, IdentifierNode, LiteralNode, MathematicalOperatorTypes, NothingLiteralNode, NumberLiteralNode, TerminatorNode, TextLiteralNode } from '../types';

export class TerminalParser {

    protected _cursor: Cursor;
    protected _errors:Array<string>;

    constructor() {
        this._cursor = new Cursor([]);
        this._errors = [];
    }

    /*
        <terminator> := 🦆
    */
    protected terminator = (): TerminatorNode | null => {
        const token = this._cursor.readCurrentToken();

        if (token && token.type === 'TERMINATOR') {
            this._cursor.advanceCursor(1);
            const result: TerminatorNode = {
                type: 'Terminator',
                value: '🦆',
                position: token.position
            };
            return result;
        }
        return null;
    };

    /*
        <operator> := + | - | * | % | && | || | < | <= | > | >= | ==  | !=
    */
    protected operator = () => {
        const token = this._cursor.readCurrentToken();
        if (!token) return null;
        
        if (this.isOperator(token)){ 
            this._cursor.advanceCursor(1);
            return token.value as MathematicalOperatorTypes;
        }

        return null;
    };

    /*
        <assignment-operator> := <-
    */
    protected assignMentOperator = (): AssignmentOperatorNode | null => {
        const token = this._cursor.readCurrentToken();
        if (!token || token.type !== 'ASSIGNMENT_OPERATOR') return null;
        this._cursor.advanceCursor(1);
        const node:AssignmentOperatorNode = {
            type: 'AssignmentOperator',
            value: token.value,
            position: token.position
        };
        return node;
    };

    /*
        <literal> := <number> | <text> | <boolean> | <nothing> | <vector2> | <vector3>;
    */
    protected literal = ():LiteralNode | null => {
        const token = this._cursor.readCurrentToken();
        if (!token) return null;

        if (token.type === 'NUMBER_VALUE'){
            this._cursor.advanceCursor(1);
            const value:NumberLiteralNode = {
                type: 'NumberLiteral',
                value: Number(token.value),
                position: token.position,
            };
            return value;
        }

        if (token.type === 'TEXT_VALUE'){
            this._cursor.advanceCursor(1);
            const value:TextLiteralNode = {
                type: 'TextLiteral',
                value: token.value,
                position: token.position
            };
            return value;
        }

        if (token.type === 'BOOLEAN_VALUE'){
            this._cursor.advanceCursor(1);
            if (
                token.value !== 'true' &&
                token.value !== 'false') {
                throw new Error('Internal error');
            }
            const value = token.value === 'true';
            const literalValue:BooleanLiteralNode = {
                type: 'BooleanLiteral',
                value: value,
                position: token.position
            };
            return literalValue;
        }

        if (token.type === 'NOTHING'){
            this._cursor.advanceCursor(1);
            const value: NothingLiteralNode = {
                type: 'NothingLiteral',
                position: token.position
            };
            return value;
        }

        // TODO - add vector literals

        return null;
    };

    /*
        <identifier> := string
    */
    protected identifier = () => {
        const token = this._cursor.readCurrentToken(); 

        if (!token || token.type !== 'IDENTIFIER') return null;
        const node:IdentifierNode = {
            type: 'Identifier',
            value: token.value,
            position: token.position
        };
        this._cursor.advanceCursor(1);
        return node;
    };

    // <dataType> := <colon> <data-type>
    protected dataTypeDeclaration = (): DataTypeNode | null => {
        const token = this._cursor.readCurrentToken();
        if (token?.type !== 'COLON') return null;
        this._cursor.advanceCursor(1);
        const possibleDataType = this._cursor.readCurrentTokenAndAdvanceByOne();
        switch (possibleDataType?.type) {
        case 'TEXT_TYPE':
            return {
                type: 'DataType',
                value: 'text',
                position: token.position
            };
        case 'NUMBER_TYPE':
            return {
                type: 'DataType',
                value: 'number',
                position: token.position
            };
        case 'BOOLEAN_TYPE':
            return {
                type: 'DataType',
                value: 'boolean',
                position: token.position
            };
        case 'NOTHING':
            return {
                type: 'DataType',
                value: 'nothing',
                position: token.position
            };
        case 'ARROW_FUNCTION':
            return {
                type: 'DataType',
                value: 'func',
                position: token.position
            };
        case 'FUNC_TYPE':
            return {
                type : 'DataType',
                value: 'func',
                position: token.position
            };
        case 'VECTOR2':
            return {
                type : 'DataType',
                value: 'vector2',
                position: token.position
            };
        case 'VECTOR3':
            return {
                type : 'DataType',
                value: 'vector3',
                position: token.position
            };
        }
        throw new Error(`Expected data type but found ${this._cursor.readCurrentToken()?.value}`);
    };

    protected isOperator = (token: Token) => (
        token.type === 'ADDITION' ||
        token.type === 'SUBTRACTION' ||
        token.type === 'MULTIPLICATION' ||
        token.type === 'MODULUS' ||
        token.type === 'DIVISION' ||
        token.type === 'AND' ||
        token.type === 'OR' ||
        token.type === 'LESS_THAN' ||
        token.type === 'GREATER_THAN' ||
        token.type === 'LESS_THAN_OR_EQUALS' ||
        token.type === 'GREATER_THAN_OR_EQUALS' ||
        token.type === 'EQUALS' ||
        token.type === 'NOT_EQUALS'
    );
}