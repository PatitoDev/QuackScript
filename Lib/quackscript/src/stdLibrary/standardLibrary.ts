import { DataTypes, InternalFuncDeclarationNode, TextLiteralNode } from '../parser/types';
import { Memory } from '../interpreter/memory';
import { MemoryValue, Value } from '../interpreter/types';
import { Position } from '../types/Position';
import { System } from '../system';
import { MemoryUtils } from '../utils/memory/memoryUtils';
import { RuntimeException } from '../exception/RuntimeException';


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
    if (value.type !== 'text') throw new RuntimeException(fakePosition, `Invalid type, expecting Text but found ${value.type}`);
    system.stdout((value.value as TextLiteralNode).value);
    return { type: 'NothingLiteral', position: fakePosition };
};

const _standardLibrary: Array<{
    identifier: string,
    params: Array<{ identifier: string, dataType: DataTypes }>
}> = [
    { identifier: 'quackprint', params: [{ 
        dataType: 'text',
        identifier: 'value'
    }] },
];

const standardLibrary: Record<string, MemoryValue> = _standardLibrary
    .map((value) => MemoryUtils.convertToInternalFunc(value.identifier, value.params))
    .reduce((a, b) => ({ ...a, [b.identifier]: b }), {});

export default standardLibrary;