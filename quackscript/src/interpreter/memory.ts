import { FuncDeclarationNode } from '../parser/types';

export interface MemoryLiteral extends MemoryObjectBase {
    type: 'literal',
    value: string | number,
}

export interface MemoryFunc extends MemoryObjectBase {
    type: 'func',
    value: FuncDeclarationNode,
}

export interface MemoryObjectBase {
    type: 'literal' | 'func' | 'internalFunc'
    identifier: string,
    declarationType: 'constant' | 'variable' | 'argument'
    value: MemoryValue,
}

export type MemoryValue = string | number | FuncDeclarationNode;

export type Scope = {
    subScope: Scope | null,
    data: Record<string, MemoryObjectBase>
};

export class Memory {

    private _memory: Scope;

    constructor (){
        this._memory = { subScope: null, data: {} };
    }
    
    public clearMemory() {
        this._memory = { subScope: null, data: {} };
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
    public get(identifier: string) {
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

    public set(identifier: string, value: MemoryObjectBase) {
        const scope = this.getActiveScope();

        const memorySlot = scope.data[identifier];
        if (memorySlot) throw new Error(`Variable '${identifier}' already exists`);
        scope.data[identifier] = value;
    }

    public update(identifier: string, value: MemoryObjectBase['value']) {
        const scope = this.getActiveScope();

        const memoryItem = scope.data[identifier];
        if (!memoryItem) throw new Error(`variable '${identifier}' does not exists`);
        if (memoryItem.declarationType === 'constant') throw new Error(`Tried to update constant '${identifier}'`);
        if (memoryItem.declarationType === 'argument') throw new Error(`Tried to update argument '${identifier}'`);

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

