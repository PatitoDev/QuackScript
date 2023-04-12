import { RuntimeException } from '../exception/RuntimeException';
import { DataTypes, IdentifierNode } from '../parser/types';
import { DataTypeUtils } from '../utils/dataTypes/dataTypeUtils';
import { MemoryUtils } from '../utils/memory/memoryUtils';
import { MemoryValue, Value } from './types';

const staticAttributeMap: Record<DataTypes, Record<string, MemoryValue>> = {
    'number': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'boolean': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'func': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'list': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'nothing': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'optional': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'text': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'vector2': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
    'vector3': {
        'toString': MemoryUtils.convertToInternalFunc('toString', []),
    },
};

const executeStaticFunction = (identifier: IdentifierNode, value: Value):Value => {
    const dataType = DataTypeUtils.valueToDataType(value.type);
    const fnSignature = getStaticPrimitiveValue(dataType, identifier);
    if (!fnSignature) throw new RuntimeException(value.position, 'Invalid data type');

    switch (identifier.value) {
    case 'toString':
        return DataTypeUtils.convertValueToText(value);
    }
    throw new RuntimeException(value.position, `Attribute '${identifier.value}' is not part of ${dataType}`);
};

const getStaticPrimitiveValue = (type: DataTypes, identifier: IdentifierNode) => (staticAttributeMap[type][identifier.value]);

export const StaticPrimitiveAttributes = {
    getStaticPrimitiveValue,
    executeStaticFunction
};
