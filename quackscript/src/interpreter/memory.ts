import { FuncDeclarationNode } from '../parser/types';

const GLOBAL_SCOPE_ID = 'GLOBAL';

export interface MemoryLiteral extends MemoryObjectBase {
    type: 'literal',
    value: string | number,
}

export interface MemoryFunc extends MemoryObjectBase {
    type: 'func',
    value: FuncDeclarationNode,
}

export interface MemoryObjectBase {
    type: 'literal' | 'func'
    identifier: string,
    declarationType: 'constant' | 'variable'
    value: string | number | FuncDeclarationNode,
}

export type Scope = Record<string, MemoryObjectBase>;
export type InternalMemoryRepresentation = Record<string, Scope>;

export class Memory {

    constructor (){
        this.createScope(GLOBAL_SCOPE_ID);
    }
    

    private _memory : InternalMemoryRepresentation = {};

    public clearMemory() {
        this._memory = {};
        this.createScope(GLOBAL_SCOPE_ID);
    }

    public clearScope(scopeId: string) {
        this._memory[scopeId] = {};
    }

    public delete(identifier: string, scopeId: string = GLOBAL_SCOPE_ID) {
        const scope = this._memory[scopeId];
        if (scope) {
            delete scope[identifier];
        }
    }

    public get(identifier: string, scopeId: string = GLOBAL_SCOPE_ID) {
        const scope = this._memory[scopeId];
        if (scope) {
            const value = scope[identifier];
            if (value) return value;
        }
        throw new Error('Variable not in memory');
    }

    public createScope(scopeId: string) {
        if (this._memory[scopeId]) throw new Error(`${scopeId} already exists`);
        this._memory[scopeId] = {};
        console.log('memory:', this._memory);
    }

    public set(identifier: string, value: MemoryObjectBase, scopeId: string = GLOBAL_SCOPE_ID) {
        console.log(`SETTING VALUE TO  ${identifier}, value: ${value.value}`);
        const scope = this._memory[scopeId];
        if (!scope) throw new Error(`scope ${scopeId} does not exists`);

        const memorySlot = scope[identifier];
        if (memorySlot) throw new Error(`variable ${identifier} already exists`);
        scope[identifier] = value;
        console.log('memory:', this._memory);
    }

    public update(identifier: string, value: MemoryObjectBase['value'], scopeId: string = GLOBAL_SCOPE_ID) {
        const scope = this._memory[scopeId];
        if (!scope) throw new Error(`scope ${scopeId} does not exist`);

        const memoryItem = scope[identifier];
        if (!memoryItem) throw new Error(`variable ${identifier} does not exists`);
        if (memoryItem.declarationType === 'constant') throw new Error(`tried to update constant ${identifier}`);

        memoryItem.value = value;
        console.log(this._memory);
    }
}

