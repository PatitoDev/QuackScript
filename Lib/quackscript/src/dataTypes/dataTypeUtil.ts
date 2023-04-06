import { Value } from '../interpreter/types';
import { DataTypes } from '../parser/types';

const valueToDataTypeMap: Record<Value['type'], DataTypes> = {
    BooleanLiteral: 'boolean',
    NothingLiteral: 'nothing',
    NumberLiteral: 'number',
    TextLiteral: 'text',
    Vector2Literal: 'vector2',
    Vector3Literal: 'vector3',
    FuncDeclaration: 'func',
    InternalFuncDeclaration: 'func'
};

export const DataTypeUtil = {
    valueToDataType: (nodeType: Value['type']) => ( valueToDataTypeMap[nodeType] )
};
