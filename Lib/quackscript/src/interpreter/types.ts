import { Node, DataTypes, FuncDeclarationNode, InternalFuncDeclarationNode, LiteralNode } from '../parser/types';

export type Value = LiteralNode | FuncDeclarationNode | InternalFuncDeclarationNode | OptionalValueNode;

export interface MemoryValue {
    declarationType: 'constant' | 'variable' | 'argument' | 'internal'
    type: DataTypes | 'internalFunc',
    identifier: string,
    value: Value,
    internalType: DataTypes | 'internalFunc' | null,
}

export interface OptionalMemoryValue extends MemoryValue {
    type: 'optional',
    internalType: DataTypes | 'internalFunc',
}

export interface OptionalValueNode extends Node<'OptionalValue'> {
    value: Value,
    internalType: DataTypes
}