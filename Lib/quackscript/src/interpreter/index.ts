import { DataTypeUtil } from '../dataTypes/dataTypeUtil';
import { 
    AssignmentNode, BinaryExpressionNode, BooleanLiteralNode, CodeBlockNode, DeclarationNode, ExpressionNode,
    FuncCallNode, FuncDeclarationNode, GenericFuncDeclarationNode, IdentifierNode,
    IfStatementNode,
    InternalFuncDeclarationNode, ModuleNode, NothingLiteralNode, NumberLiteralNode, ReturnStatementNode,
    StatementNode, 
    TextLiteralNode} from '../parser/types';
import { executeInternalFunc } from '../stdLibrary/standardLibrary';
import { Memory } from './memory';
import { Value } from './types';

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
    private _stdOut: (outcome: Value) => void;
    private _state: State;

    public constructor(stdout?: (outcome: Value) => void){
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
            if (output !== null && output.type !== 'NothingLiteral'){
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

    private executeStatement(statement: StatementNode): Value | null {
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
        case 'IfStatement':
            this.executeIfStatementNode(statement.body as IfStatementNode);
            return null;
        }
    }

    private executeIfStatementNode = (node: IfStatementNode): null => {
        const value = this.executeExpressionNode(node.condition);
        let isConditionTrue = false;
        switch (value.type){
        case 'BooleanLiteral':
            isConditionTrue = (value as BooleanLiteralNode).value;
            break;
        case 'NothingLiteral':
            isConditionTrue = false;
            break;
        case 'FuncDeclaration':
        case 'InternalFuncDeclaration':
        case 'NumberLiteral':
        case 'TextLiteral':
        case 'Vector2Literal':
        case 'Vector3Literal':
            throw new Error('Invalid boolean expression');
        }

        if (isConditionTrue) {
            this.executeBlock(node.trueExpression);
        } else if (node.falseExpression !== null) {
            this.executeBlock(node.falseExpression);
        }

        return null;
    };

    private executeDeclaration = (node: DeclarationNode) => {
        const typeOfAssignment = node.declaratorType;
        const id = node.assignmentNode.identifier.value;

        let value: Value | null = null;
        value = this.executeExpressionNode(node.assignmentNode.expression);
        if (!value) {
            value = {
                type: 'NothingLiteral',
            } as NothingLiteralNode;
        }

        // if we have a type declared assign it else we inferred it
        const type = node.dataType?.value ?? DataTypeUtil.valueToDataType(value.type);

        this._memory.set(id, {
            isOptional: node.isOptional,
            declarationType: typeOfAssignment,
            identifier: id,
            type,
            value: value,
        });
    };

    private executeAssignment = (node: AssignmentNode) => {
        const id = node.identifier.value;
        let value: Value | null = null;
        switch (node.expression.type) {
        case 'Expression':
            value = this.executeExpressionNode(node.expression as ExpressionNode);
            break;
        }

        // TODO - non function returning value on expression evaluates to null;
        if (value === null) throw new Error('Internal error on assignment');
        this._memory.update(id, value);
    };

    private executeFunctionCall = (node: FuncCallNode): Value => {
        const id = node.identifier.value;
        const memoryValue = this._memory.get(id);
        if (memoryValue.type !== 'func' && memoryValue.type !== 'internalFunc'){
            throw new Error(`tried to call variable '${id}' as a function`);
        }

        if (memoryValue.value.type === 'NothingLiteral') {
            throw new Error('tried to call \'nothing\' as a function');
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
            const dataType = DataTypeUtil.valueToDataType(argResult.type);
            this._memory.set(param.value, {
                declarationType: 'argument',
                identifier: param.value,
                type: dataType,
                value: argResult,
                isOptional: false
            });
        });

        let returnedValue: Value | null = null;
        if (memoryValue.type === 'internalFunc'){
            returnedValue = executeInternalFunc(fn as InternalFuncDeclarationNode, this._memory, this._stdOut);
        } else {
            returnedValue = this.executeStatements((fn as FuncDeclarationNode).body.body);
        }

        if (returnedValue === null) {
            returnedValue = {
                type: 'NothingLiteral'
            } as NothingLiteralNode;
        }

        this._memory.clearScope();
        this._state.pop();
        return returnedValue;
    };

    private executeExpressionNode = (node:ExpressionNode): Value => {
        switch (node.body.type) {
        case 'FuncDeclaration':
        case 'TextLiteral':
        case 'BooleanLiteral':
        case 'NothingLiteral':
        case 'Vector2Literal':
        case 'Vector3Literal':
        case 'NumberLiteral':
            return node.body;
        case 'FuncCallNode':
            return this.executeFunctionCall(node.body as FuncCallNode);
        case 'Identifier':
            return this._memory.get((node.body as IdentifierNode).value).value;
        case 'BinaryExpression':
            return this.executeBinaryExpression(node.body as BinaryExpressionNode);
        }
    };

    private executeBinaryExpression = (node: BinaryExpressionNode): Value => {
        const rightValue = this.executeExpressionNode(node.right);
        if (rightValue === null) {
            throw new Error('Internal error binary expression must have right value');
        }

        if (
            rightValue.type === 'FuncDeclaration' ||
            rightValue.type === 'InternalFuncDeclaration'
        ) {
            throw new Error('Invalid binary expression');
        }

        let leftValueUnwrapped: Value = { 
            type: 'NothingLiteral'
        };

        if (node.left.type === 'Identifier') {
            const valueFromMemory = this._memory.get(node.left.value);
            if (valueFromMemory.type === 'func' ||
                valueFromMemory.type === 'internalFunc') {
                throw new Error('Invalid binary expression');
            }
            leftValueUnwrapped = valueFromMemory.value;
        } else {
            leftValueUnwrapped = node.left;
        }

        // Both are boolean - binary expression
        if (leftValueUnwrapped.type === 'BooleanLiteral' && rightValue.type === 'BooleanLiteral') {
            const left = leftValueUnwrapped as BooleanLiteralNode;
            const right = rightValue as BooleanLiteralNode;
            let finalValue: boolean | null = null;

            switch (node.operator) {
            case '!=':
                finalValue = left.value !== right.value;
                break;
            case '&&':
                finalValue = left.value && right.value;
                break;
            case '==':
                finalValue = left.value === right.value;
                break;
            case '||':
                finalValue = left.value || right.value;
                break;
            }

            if (finalValue === null) {
                throw new Error('Unable to parse binary expression');
            }
            return {
                type: 'BooleanLiteral',
                value: finalValue
            } as BooleanLiteralNode;
        }

        if (leftValueUnwrapped.type === 'NumberLiteral' && rightValue.type === 'NumberLiteral') {
            const left = leftValueUnwrapped as NumberLiteralNode;
            const right = rightValue as NumberLiteralNode;
            let finalValue: number | boolean | null = null;

            switch (node.operator) {
            case '!=':
                finalValue = left.value !== right.value;
                break;
            case '%':
                finalValue = left.value % right.value;
                break;
            case '*':
                finalValue = left.value * right.value;
                break;
            case '-':
                finalValue = left.value - right.value;
                break;
            case '+':
                finalValue = left.value + right.value;
                break;
            case '/':
                finalValue = left.value / right.value;
                break;
            case '<':
                finalValue = left.value < right.value;
                break;
            case '<=':
                finalValue = left.value <= right.value;
                break;
            case '>=':
                finalValue = left.value >= right.value;
                break;
            case '==':
                finalValue = left.value === right.value;
                break;
            case '>':
                finalValue = left.value > right.value;
                break;
            }

            if (typeof finalValue === 'boolean') {
                return {
                    type: 'BooleanLiteral',
                    value: finalValue
                } as BooleanLiteralNode;
            }

            if (typeof finalValue === 'number') {
                return {
                    type: 'NumberLiteral',
                    value: finalValue
                } as NumberLiteralNode;
            }
        }

        if (leftValueUnwrapped.type === 'TextLiteral' && rightValue.type === 'TextLiteral') {
            const left = leftValueUnwrapped as TextLiteralNode;
            const right = rightValue as TextLiteralNode;
            let finalValue: string | boolean | null = null;
        
            switch (node.operator){
            case '!=':
                finalValue = left.value !== right.value;
                break;
            case '==':
                finalValue = left.value === right.value;
                break;
            case '+':
                finalValue = left.value.concat(right.value);
                break;
            }
        
            if (typeof finalValue === 'string') {
                return {
                    type: 'TextLiteral',
                    value: finalValue
                } as TextLiteralNode;
            }
        
            if (typeof finalValue === 'boolean') {
                return {
                    type: 'BooleanLiteral',
                    value: finalValue
                } as BooleanLiteralNode;
            }
        }

        if (
            leftValueUnwrapped.type !== rightValue.type &&
            node.operator === '!=' ||
            node.operator === '=='
        ){
            return {
                type: 'BooleanLiteral',
                value: node.operator === '!='
            } as BooleanLiteralNode;
        }

        // TODO - implement vectors

        throw new Error('Unable to parse binary expression');
    };

}