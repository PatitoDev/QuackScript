import { MemoryValue, } from '../../interpreter/types';
import { InternalFuncDeclarationNode } from '../../parser/types';

const convertToInternalFunc = (identifier: string, params: Array<string>): MemoryValue => ({
    internalType: null,
    declarationType: 'internal',
    identifier: identifier,
    type: 'internalFunc',
    value: {
        identifier: identifier,
        parameters: {
            type: 'Params',
            params: params.map((param) => ({
                type: 'Identifier',
                value: param
            })),
        },
        type: 'InternalFuncDeclaration',
    } as InternalFuncDeclarationNode
});

export const MemoryUtils = {
    convertToInternalFunc
};
