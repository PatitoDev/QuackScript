import { DataTypes, FuncDeclarationNode, InternalFuncDeclarationNode, LiteralNode } from '../parser/types';

export type Value = LiteralNode | FuncDeclarationNode | InternalFuncDeclarationNode;

export interface MemoryValue {
    declarationType: 'constant' | 'variable' | 'argument' | 'internal'
    type: DataTypes | 'internalFunc',
    isOptional: boolean,
    identifier: string,
    value: Value,
}