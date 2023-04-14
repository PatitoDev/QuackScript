import { MemoryValue, } from '../../interpreter/types';
import { DataTypes, InternalFuncDeclarationNode, ParamNode } from '../../parser/types';
import { Position } from '../../types/Position';

const fakePosition:Position = {
    globalChar: 1,
    line: 1,
    lineChar: 1
};

const convertToInternalFunc = (identifier: string, params: Array<{
    identifier: string,
    dataType: DataTypes
}>): MemoryValue => ({
    internalType: null,
    declarationType: 'internal',
    identifier: identifier,
    type: 'internalFunc',
    value: {
        identifier: identifier,
        position: fakePosition,
        parameters: {
            position: fakePosition,
            type: 'Params',
            params: params.map((param) => ({
                dataType: {
                    position: fakePosition,
                    type: 'DataType',
                    value: param.dataType
                },
                identifier: {
                    position: fakePosition,
                    type: 'Identifier',
                    value: param.identifier
                },
                position: fakePosition,
                type: 'Param'
            } as ParamNode)),
        },
        type: 'InternalFuncDeclaration',
    } as InternalFuncDeclarationNode
});

export const MemoryUtils = {
    convertToInternalFunc
};
