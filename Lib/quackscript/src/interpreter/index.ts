import { AssignmentNode, BinaryExpressionNode, CodeBlockNode, DeclarationNode, ExpressionNode, FuncCallNode, FuncDeclarationNode, GenericFuncDeclarationNode, IdentifierNode, InternalFuncDeclarationNode, LiteralNode, ModuleNode, ReturnStatementNode, StatementNode } from '../parser/types';
import standardLibrary, { executeInternalFunc } from '../stdLibrary/standardLibrary';
import { Memory, MemoryValue } from './memory';

// TODO - make a stdout to output


type StateType = 'topLevel' | 'function' | 'while' | 'for';

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

export default class Interpreter {

    public _memory;
    private _stdOut: (outcome: MemoryValue) => void;
    private _state: State;

    public constructor(stdout?: (outcome: MemoryValue) => void){
        this._state = new State();
        this._memory = new Memory();
        if (stdout) {
            this._stdOut = stdout;
        } else {
            this._stdOut = console.log;
        }
    }

    public execute(tree: ModuleNode) {
        this._memory.clearMemory();
        for (const statement of tree.statements){
            const output = this.executeStatement(statement);
            if (output !== null){
                this._stdOut(output);
            }
        }
        this._memory.printMemory();
    }

    // TODO - check redundancy
    public executeBlock(block: CodeBlockNode) {
        for (const statement of block.body) {
            const outcome = this.executeStatement(statement);
            if (statement.body.type === 'ReturnStatement') {
                if (this._state.getCurrentState() !== 'function'){
                    throw new Error('Tried to return outside a function');
                }
                return outcome;
            }
        }
        return null;
    }

    public executeStatements(statements: Array<StatementNode>) {
        for (const statement of statements) {
            const outcome = this.executeStatement(statement);
            if (statement.body.type === 'ReturnStatement') {
                if (this._state.getCurrentState() !== 'function') {
                    throw new Error('Tried to return outside a function');
                }
                return outcome;
            }
        }
        return null;
    }

    private executeStatement(statement: StatementNode) {
        switch (statement.body.type) {
        case 'Declaration':
            this.executeDeclaration(statement.body as DeclarationNode);
            return null;
        case 'Assignment':
            this.executeAssignment(statement.body as AssignmentNode);
            return null;
        case 'Expression':
            return this.executeExpressionNode(statement.body as ExpressionNode);
        case 'ReturnStatement':
            return this.executeExpressionNode((statement.body as ReturnStatementNode).value);
        }
    }

    private executeDeclaration = (node: DeclarationNode) => {
        const typeOfAssignment = node.declaratorType;
        const id = node.assignmentNode.identifier.value;

        let value: MemoryValue | null = null;
        value = this.executeExpressionNode(node.assignmentNode.expression);
        if (!value) throw new Error('unable to assign null');
        // TODO - add null type

        this._memory.set(id, {
            declarationType: typeOfAssignment,
            identifier: id,
            type: value.type,
            value: value.value,
        });
    };

    private executeAssignment = (node: AssignmentNode) => {
        const id = node.identifier.value;
        let value: MemoryValue | null = null;
        switch (node.expression.type) {
        case 'Expression':
            value = this.executeExpressionNode(node.expression as ExpressionNode);
            break;
        }

        // TODO - non function returning value on expression evaluates to null;
        if (value === null) throw new Error('Internal error on assignment');
        this._memory.update(id, value);
    };

    private executeFunctionCall = (node: FuncCallNode): MemoryValue | null => {
        const id = node.identifier.value;
        const memoryValue = this._memory.get(id);
        if (memoryValue.type !== 'func' && memoryValue.type !== 'internalFunc'){
            throw new Error(`tried to call variable '${id}' as a function`);
        }

        const fn = (memoryValue.value as GenericFuncDeclarationNode);
        this._state.push('function');
        this._memory.createScope();

        const params = fn.parameters?.params ?? [];
        const args = node.params?.args ?? [];
        if (params.length !== args.length) {
            throw new Error(`Expecting ${params.length} arguments but got ${args.length} arguments`);
        }
        params.forEach((param, i) => {
            const arg = args[i];
            if (!arg) throw new Error('internal error, index out of bounds');
            const argResult = this.executeExpressionNode(arg);
            if (argResult === null) throw new Error('null as parameter not allowed yet');
            this._memory.set(param.value, {
                declarationType: 'argument',
                identifier: param.value,
                type: argResult.type,
                value: argResult.value,
            });
        });

        let returnedValue: MemoryValue | null = null;
        if (memoryValue.type === 'internalFunc'){
            returnedValue = executeInternalFunc(fn as InternalFuncDeclarationNode, this._memory, this._stdOut);
        } else {
            returnedValue = this.executeStatements((fn as FuncDeclarationNode).body.body);
        }

        this._memory.clearScope();
        this._state.pop();
        return returnedValue;
    };

    private executeExpressionNode = (node:ExpressionNode): MemoryValue | null => {
        switch (node.body.type) {
        case 'FuncCallNode':
            return this.executeFunctionCall(node.body as FuncCallNode);
        case 'NumberLiteral':
        case 'StringLiteral':
            return {
                value: (node.body as LiteralNode).value,
                type: 'literal'
            };
        case 'Identifier':
            return this._memory.get((node.body as IdentifierNode).value);
        case 'BinaryExpression':
            return {
                value: this.executeBinaryExpression(node.body as BinaryExpressionNode),
                type: 'literal'
            };
        case 'FuncDeclaration':
            return {
                value: (node.body as FuncDeclarationNode),
                type: 'func'
            } ;
        }
    };

    private executeBinaryExpression = (node: BinaryExpressionNode) => {
        const leftNode = node.left;
        const rightValue = this.executeExpressionNode(node.right);
        let leftValue: null | number = null;
        if (rightValue === null) {
            throw new Error('Internal error binary expression must have right value');
        }
        if (typeof rightValue.value !== 'number') {
            throw new Error('Binary expression of this type has not been implemented yet');
        }
        switch (leftNode.type){
        case 'Identifier':
            // eslint-disable-next-line no-case-declarations
            const valueFromMemory = this._memory.get(leftNode.value);
            if (valueFromMemory.type !== 'literal') {
                throw new Error(`Unable to evaluate '${valueFromMemory.identifier}'`);
            }
            if (typeof valueFromMemory.value !== 'number') {
                throw new Error('Binary expression of this type has not been implemented yet');
            }
            leftValue = valueFromMemory.value as number;
            break;
        case 'NumberLiteral':
            leftValue = leftNode.value as number;
            break;
        case 'StringLiteral':
            throw new Error('Binary expression of this type has not been implemented yet');
        }

        switch (node.operator) {
        case '*':
            return leftValue * rightValue.value;
        case '+':
            return leftValue + rightValue.value;
        case '-':
            return leftValue - rightValue.value;
        case '/':
            return leftValue / rightValue.value;
        case '%':
            return leftValue % rightValue.value;
        }
    };

}