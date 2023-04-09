export type StateType = 'topLevel' | 'function' | 'while' | 'for';

// TODO - fix issue with nested function returns
export class State {
    private _stateStack: Array<StateType>;

    constructor(){
        this._stateStack = ['topLevel'];
    }

    public push(state: Exclude<StateType, 'topLevel'>){
        this._stateStack.push(state);
    }

    public pop(){
        return this._stateStack.pop();
    }

    public getCurrentState(){
        const currentState = this._stateStack[this._stateStack.length - 1];
        if (!currentState) throw new Error('Internal state error');
        return currentState;
    }

    public popToTopLevel(){
        this._stateStack = ['topLevel'];
    }
}