import { InternalFuncDeclarationNode } from '../parser/types';
import { Memory, MemoryObjectBase, MemoryValue } from '../interpreter/memory';

export const executeInternalFunc = (node: InternalFuncDeclarationNode,
    memory: Memory,
    stdOut: (outcome: MemoryValue) => void): MemoryValue | null => {
    switch (node.identifier){
    case 'quackprint':
        return execQuackPrint(memory, stdOut);
    case 'sayQuack':
        return execQuack(memory, stdOut);
    }

    return null;
};

const execQuack = (memory: Memory, stdOut: (outcome:MemoryValue) => void) : MemoryValue | null => {
    return {
        type: 'literal',
        value: 'quack'
    };
};

const execQuackPrint = (memory: Memory, stdOut: (outcome:MemoryValue) => void): MemoryValue | null => {
    const value = memory.get('value');
    stdOut(value);
    return null;
};

const _standardLibrary: Array<{
    identifier: string,
    params: Array<string>
}> = [
    { identifier: 'quackprint', params: ['value'] },
    { identifier: 'sayQuack', params: [] },
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
}) as MemoryObjectBase);

const standardLibrary: Record<string, MemoryObjectBase> = libraryAsArray
    .reduce((a, b) => ({ ...a, [b.identifier]: b }), {});

export default standardLibrary;