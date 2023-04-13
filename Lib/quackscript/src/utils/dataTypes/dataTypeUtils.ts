import { Value } from '../../interpreter/types';
import { BooleanLiteralNode, DataTypes, FuncDeclarationNode, NumberLiteralNode, TextLiteralNode } from '../../parser/types';

const valueToDataTypeMap: Record<Value['type'], DataTypes> = {
    BooleanLiteral: 'boolean',
    NothingLiteral: 'nothing',
    NumberLiteral: 'number',
    TextLiteral: 'text',
    Vector2Literal: 'vector2',
    Vector3Literal: 'vector3',
    FuncDeclaration: 'func',
    InternalFuncDeclaration: 'func',
    OptionalValue: 'optional'
};

const convertValueToText = (value: Value): TextLiteralNode => {
    let textValue = '';
    switch (value.type) {
    case 'BooleanLiteral':
        textValue = (value as BooleanLiteralNode).value ? 'true' : 'false';
        break;
    case 'FuncDeclaration':
    case 'InternalFuncDeclaration':
        // eslint-disable-next-line no-case-declarations
        const paramsAsString = ((value as FuncDeclarationNode).parameters)?.params.map((value) => ( 
            value.value
        )).join(', ') ?? '';
        textValue = `(: ${paramsAsString} :) :> {: [function-body] :}`;
        break;
    case 'NothingLiteral':
        textValue = 'nothing';
        break;
    case 'NumberLiteral':
        textValue = (value as NumberLiteralNode).value.toString();
        break;
    case 'Vector2Literal':
        throw new Error('conversion to string not implemented');
    case 'Vector3Literal':
        throw new Error('conversion to string not implemented');
    case 'TextLiteral':
        return (value as TextLiteralNode);
    case 'OptionalValue':
        textValue = `${convertValueToText(value.value).value}:Optional<${value.internalType}>`;
    }
    return {
        position: value.position,
        type: 'TextLiteral',
        value: textValue
    };
};



export const DataTypeUtils = {
    valueToDataType: (nodeType: Value['type']) => ( valueToDataTypeMap[nodeType] ),
    convertValueToText
};
