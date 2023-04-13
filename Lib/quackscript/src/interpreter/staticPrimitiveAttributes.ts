import { RuntimeException } from '../exception/RuntimeException';
import { DataTypes, IdentifierNode } from '../parser/types';
import { DataTypeUtils } from '../utils/dataTypes/dataTypeUtils';
import { MemoryUtils } from '../utils/memory/memoryUtils';
import { MemoryValue, OptionalValueNode, Value } from './types';

const staticAttributeMap: Record<DataTypes, Record<string, MemoryValue>> = {
    'number': {
    },
    'boolean': {
    },
    'func': {
    },
    'list': {
    },
    'nothing': {
    },
    'optional': {
        'unwrap': MemoryUtils.convertToInternalFunc('unwrap', [])
    },
    'text': {
    },
    'vector2': {
    },
    'vector3': {
    },
};

const commonStaticAttributeMap: Record<string, MemoryValue> = {
    'toText': MemoryUtils.convertToInternalFunc('toText', []),
};

const executeStaticOptionalFunction = (identifier: IdentifierNode, value: OptionalValueNode):Value => {
    const dataType = DataTypeUtils.valueToDataType(value.type);
    switch (identifier.value){
    case 'unwrap':
        if (value.value.type === 'NothingLiteral') {
            throw new Error('Unwrapped a optional with nothing inside');
        }
        return value.value;
    }
    throw new RuntimeException(value.position, `Attribute '${identifier.value}' is not part of ${dataType}`);
};

const executeStaticFunction = (identifier: IdentifierNode, value: Value):Value => {
    const dataType = DataTypeUtils.valueToDataType(value.type);
    const fnSignature = getStaticPrimitiveValue(dataType, identifier);
    if (!fnSignature) throw new RuntimeException(value.position, 'Invalid data type');

    switch (identifier.value) {
    case 'toText':
        return DataTypeUtils.convertValueToText(value);
    }
    
    if (value.type === 'OptionalValue') {
        return executeStaticOptionalFunction(identifier, value);
    }
    throw new RuntimeException(value.position, `Attribute '${identifier.value}' is not part of ${dataType}`);
};

const getStaticPrimitiveValue = (type: DataTypes, identifier: IdentifierNode) => (
    (commonStaticAttributeMap[identifier.value]) ??
    (staticAttributeMap[type][identifier.value])
);

export const StaticPrimitiveAttributes = {
    getStaticPrimitiveValue,
    executeStaticFunction
};
