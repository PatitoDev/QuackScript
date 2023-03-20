import { AssignmentNode, CodeBlockNode, DeclarationNode, ExpressionNode, FuncCallNode, FuncDeclarationNode, IdentifierNode, LiteralNode, ModuleNode, StatementNode } from '../parser/types';
import { Memory, MemoryObjectBase, MemoryValue } from './memory';

// TODO - make a stdout to output

export default class Interpreter {

    private _memory;
    private _stdOut: (outcome: MemoryValue) => void;

    public constructor(stdout?: (outcome: MemoryValue) => void){
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
            if (output){
                this._stdOut(output);
            }
        }
    }

    public executeBlock(block: CodeBlockNode) {
        for (const statement of block.body) {
            const outcome = this.executeStatement(statement);
            if (outcome) {
                this._stdOut(outcome);
            }
        }
    }

    public executeStatements(statements: Array<StatementNode>) {
        for (const statement of statements) {
            const outcome = this.executeStatement(statement);
            if (outcome) {
                this._stdOut(outcome);
            }
        }
    }

    private executeStatement(statement: StatementNode) {
        switch (statement.body.type) {
        case 'Declaration':
            this.executeDeclaration(statement.body as DeclarationNode);
            return;
        case 'Assignment':
            this.executeAssignment(statement.body as AssignmentNode);
            return;
        case 'Expression':
            return this.executeExpressionNode(statement.body as ExpressionNode);
        }
    }

    private executeDeclaration = (node: DeclarationNode) => {
        const typeOfAssignment = node.declaratorType;
        const id = node.assignmentNode.identifier.value;

        let value: MemoryValue | null = null;
        let valueType:MemoryObjectBase['type'] = 'func';

        if (node.assignmentNode.expression.type === 'FuncDeclaration'){
            value = node.assignmentNode.expression as FuncDeclarationNode;
            valueType = 'func';
        } else {
            value = this.executeExpressionNode(node.assignmentNode.expression as ExpressionNode);
            valueType = 'literal';
        }

        // todo - check null returns;
        if (value === null) throw new Error('Internal Error on declaration');

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
        case 'FuncDeclaration':
            value = (node.expression as FuncDeclarationNode);
            break;
        }

        // TODO - non function returning value on expression evaluates to null;
        if (value === null) throw new Error('Internal error on assignment');
        this._memory.update(id, value);
    };

    // TODO - fix incorrect scope walking
    private executeFunctionCall = (node: FuncCallNode) => {
        const id = node.identifier.value;
        const memoryValue = this._memory.get(id);
        if (memoryValue.type !== 'func') throw new Error('tried to call a variable as a function');
        const fn = (memoryValue.value as FuncDeclarationNode);
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
                declarationType: 'constant',
                identifier: param.value,
                type: 'func',
                value: argResult
            });
        });

        this.executeStatements(fn.body.body);
        this._memory.clearScope();
    };

    private executeExpressionNode = (node:ExpressionNode): MemoryValue | null => {
        switch (node.body.type) {
        case 'FuncCallNode':
            // TODO - implement parameter
            this.executeFunctionCall(node.body as FuncCallNode);
            return null;
        case 'NumberLiteral':
            return (node.body as LiteralNode).value;
        case 'StringLiteral':
            return (node.body as LiteralNode).value;
        case 'Identifier':
            return this._memory.get((node.body as IdentifierNode).value).value as MemoryValue;
        case 'BinaryExpression':
            // TODO implement binary expression
            throw new Error('Not implemented binary expression');
        }
    };

/*

    public execute(tree: ModuleNode) {
        for (const node of tree.statements) {
            return this.dfsInOrder(node.body);
        }
    }

    private dfsInOrder = (node: BinaryExpressionNode['right']): number => {
        if (node.type === 'NumberLiteral') {
            return (node.body as LiteralNode<number>).value;
        }

        if (node.type === 'BinaryExpression') {
            const { left, right, operator } = (node.body) as BinaryExpressionNode;
            const leftValue = this.dfsInOrder(left);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const rightValue = this.dfsInOrder(right!);

            switch (operator) {
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
        }

        // TODO - implement other types
        throw new Error('Invalid type');
    };
*/
}