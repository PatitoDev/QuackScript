import { MemoryObjectBase } from './memory';

const quackPrint: MemoryObjectBase = {
    declarationType: 'constant',
    identifier: 'quackprint',
    type: 'internalFunc',
    value: 'test'
};

const standardLibrary = {
    quackPrint
};

export default standardLibrary;