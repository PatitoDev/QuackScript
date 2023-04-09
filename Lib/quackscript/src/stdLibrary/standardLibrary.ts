import { InternalFuncDeclarationNode } from '../parser/types';
import { Memory } from '../interpreter/memory';
import { MemoryValue, Value } from '../interpreter/types';
import { Position } from '../types/Position';
import { System } from '../system';

const fakePosition:Position = {
    char: 0,
    line: 0,
    start: 0
};

export const executeInternalFunc = (node: InternalFuncDeclarationNode,
    memory: Memory,
    system: System): Value => {
    switch (node.identifier){
    case 'quackprint':
        return execQuackPrint(memory, system);
    }

    return { 
        type: 'NothingLiteral',
        position: fakePosition
    };
};

const execQuackPrint = (memory: Memory, system: System): Value => {
    const value = memory.get('value');
    // TODO - add helper to parse to string
    system.stdout(value.value.type);
    return { type: 'NothingLiteral', position: fakePosition };
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