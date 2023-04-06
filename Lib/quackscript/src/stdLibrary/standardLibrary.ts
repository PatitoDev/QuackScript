import { InternalFuncDeclarationNode } from '../parser/types';
import { Memory } from '../interpreter/memory';
import { MemoryValue, Value } from '../interpreter/types';

export const executeInternalFunc = (node: InternalFuncDeclarationNode,
    memory: Memory,
    stdOut: (outcome: Value) => void): Value | null => {
    switch (node.identifier){
    case 'quackprint':
        return execQuackPrint(memory, stdOut);
    }

    return null;
};

const execQuackPrint = (memory: Memory, stdOut: (outcome:Value) => void): Value | null => {
    const value = memory.get('value');
    stdOut(value.value);
    return null;
};

const _standardLibrary: Array<{
    identifier: string,
    params: Array<string>
}> = [
    { identifier: 'quackprint', params: ['value'] },
];

const libraryAsArray = _standardLibrary.map((value) => ({
    declarationType: 'internal',
    identifier: value.identifier,
    type: 'internalFunc',
    value: {
        identifier: value.identifier,
        parameters: {
            type: 'Params',
            params: value.params.map((param) => ({
                type: 'Identifier',
                value: param
            })),
        },
        type: 'InternalFuncDeclaration',
    } as InternalFuncDeclarationNode
}) as MemoryValue);

const standardLibrary: Record<string, MemoryValue> = libraryAsArray
    .reduce((a, b) => ({ ...a, [b.identifier]: b }), {});

export default standardLibrary;