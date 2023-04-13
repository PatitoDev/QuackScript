import { DataTypeUtils } from '../utils/dataTypes/dataTypeUtils';
import standardLibrary from '../stdLibrary/standardLibrary';
import { MemoryValue, OptionalMemoryValue, OptionalValueNode, Value } from './types';
import { RuntimeException } from '../exception/RuntimeException';

export type Scope = {
    subScope: Scope | null,
    data: Record<string, MemoryValue>
};

export class Memory {

    private _memory: Scope;

    constructor () {
        this._memory = { subScope: null, data: {
            ...standardLibrary
        } };
    }

    public clearMemory() {
        this._memory = { subScope: null, data: {
            ...standardLibrary
        } };
    }

    public clearScope() {
        let scope: Scope | null = this._memory;

        if (scope.subScope === null) {
            this.clearMemory();
            return;
        }

        do {
            if (scope.subScope?.subScope === null) {
                scope.subScope = null;
            }
            scope = scope.subScope;
        } while (scope !== null);
    }

    public delete(identifier: string) {
        const scope = this.getActiveScope();
        if (scope) {
            delete scope.data[identifier];
        }
    }

    /**
     * gets a value from memory
     * @throws error when variable not in memory
     */
    public get(identifier: string): MemoryValue {
        const allScopes = this.getAllScopesInOrder().reverse();
        for (const scope of allScopes) {
            const value = scope.data[identifier];
            if (value) return value;
        }
        console.log(this._memory);
        throw new Error(`Variable '${identifier}' not in memory`);
    }

    public createScope() {
        const scope = this.getActiveScope();
        scope.subScope = { data: {}, subScope: null};
    }

    public set(identifier: string, value: MemoryValue) {
        const scope = this.getActiveScope();
        const memorySlot = scope.data[identifier];
        if (memorySlot) throw new Error(`Variable '${identifier}' already exists`);

        const valueType = DataTypeUtils.valueToDataType(value.value.type);

        let dataNodeType = value.type;
        if (dataNodeType === 'optional') {
            dataNodeType = (value as OptionalMemoryValue).internalType;
            if (dataNodeType === 'internalFunc'){
                throw new RuntimeException(value.value.position, 'Tried to assign internal function');
            }

            if (valueType !== 'nothing' && valueType !== dataNodeType){
                throw new RuntimeException(value.value.position, `Tried to assign ${valueType} to optional<${dataNodeType}>`);
            }

            const valueToSave: OptionalValueNode = {
                internalType: dataNodeType,
                position: value.value.position,
                type: 'OptionalValue',
                value: value.value
            };

            scope.data[identifier] = {
                ...value,
                value: valueToSave
            };
            return;
        }

        if (dataNodeType !== valueType) {
            throw new Error(`Tried to assign '${valueType}' to a '${dataNodeType}'`);
        }

        scope.data[identifier] = value;
    }

    public update(identifier: string, value: Value) {
        const memoryItem = this.get(identifier);

        if (!memoryItem) throw new Error(`variable '${identifier}' does not exists`);
        if (memoryItem.declarationType === 'constant') throw new Error(`Tried to update constant '${identifier}'`);
        if (memoryItem.declarationType === 'argument') throw new Error(`Tried to update argument '${identifier}'`);
        const type = DataTypeUtils.valueToDataType(value.type);

        if (memoryItem.type === 'optional' && 
            (memoryItem.internalType === type || type === 'nothing')
        ){
            (memoryItem.value as OptionalValueNode).value = value;
            return;
        }

        if (memoryItem.type !== type) throw new Error(`Tried to assign '${type}' to a '${memoryItem.type}'`);
        memoryItem.value = value;
    }

    private getAllScopesInOrder() {
        const allScopes:Array<Scope> = [];
        let currentScope:Scope | null = this._memory;
        while (currentScope !== null) {
            allScopes.push(currentScope);
            currentScope = currentScope.subScope;
        }
        return allScopes;
    }

    private getActiveScope(){
        let scope: Scope | null = this._memory;
        do {
            if (scope.subScope === null){
                return scope;
            }
            scope = scope.subScope;
        } while (scope !== null);
        return scope;
    }

    public printMemory() {
        console.log(this._memory);
    }
}

