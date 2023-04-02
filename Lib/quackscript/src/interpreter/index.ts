import { AssignmentNode, BinaryExpressionNode, CodeBlockNode, DeclarationNode, ExpressionNode, FuncCallNode, FuncDeclarationNode, IdentifierNode, LiteralNode, ModuleNode, ReturnStatementNode, StatementNode } from '../parser/types';
import { Memory, MemoryObjectBase, MemoryValue } from './memory';

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

    private _memory;
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
        let valueType:MemoryObjectBase['type'] = 'func';

        value = this.executeExpressionNode(node.assignmentNode.expression);
        //valueType = node.assignmentNode.expression.body.type === 'FuncDeclaration' ? 'func' : 'literal';

        // todo - check null returns;
        if (value === null) throw new Error('Internal Error on declaration');
        // TODO - update type checking
        if (typeof value === 'string' || typeof value === 'number') {
            valueType = 'literal';
        }

        this._memory.set(id, {
            declarationType: typeOfAssignment,
            identifier: id,
            type: valueType,
            value
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
        if (memoryValue.type !== 'func') throw new Error(`tried to call variable '${id}' as a function`);

        const fn = (memoryValue.value as FuncDeclarationNode);
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
                type: 'func', //TODO - assign correct type
                value: argResult
            });
        });

        const returnedValue = this.executeStatements(fn.body.body);
        this._memory.clearScope();
        this._state.pop();
        return returnedValue;
    };

    private executeExpressionNode = (node:ExpressionNode): MemoryValue | null => {
        switch (node.body.type) {
        case 'FuncCallNode':
            return this.executeFunctionCall(node.body as FuncCallNode);
        case 'NumberLiteral':
            return (node.body as LiteralNode).value;
        case 'StringLiteral':
            return (node.body as LiteralNode).value;
        case 'Identifier':
            return this._memory.get((node.body as IdentifierNode).value).value as MemoryValue;
        case 'BinaryExpression':
            return this.executeBinaryExpression(node.body as BinaryExpressionNode);
        case 'FuncDeclaration':
            return (node.body as FuncDeclarationNode);
        }
    };

    private executeBinaryExpression = (node: BinaryExpressionNode) => {
        const leftNode = node.left;
        const rightValue = this.executeExpressionNode(node.right);
        let leftValue: null | number = null;
        if (rightValue === null) {
            throw new Error('Internal error binary expression must have right value');
        }
        if (typeof rightValue !== 'number') {
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
            return leftValue * rightValue;
        case '+':
            return leftValue + rightValue;
        case '-':
            return leftValue - rightValue;
        case '/':
            return leftValue / rightValue;
        case '%':
            return leftValue % rightValue;
        }
    };

}