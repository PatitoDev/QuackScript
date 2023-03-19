import { AssignmentNode, DeclarationNode, ExpressionNode, IdentifierNode, LiteralNode, ModuleNode, StatementNode } from '../parser/types';
import { Memory } from './memory';

export default class Interpreter {

    private _memory = new Memory();

    public execute(tree: ModuleNode) {
        const stdOut:Array<string> = [];
        this._memory.clearMemory();
        for (const statement of tree.statements){
            const output = this.executeStatement(statement);
            if (output){
                stdOut.push(output as string);
            }
        }
        return stdOut;
    }

    private executeStatement(statement: StatementNode) {
        console.log('pre', statement);
        switch (statement.body.type) {
        case 'Declaration':
            // save to memory
            this.executeDeclaration(statement.body as DeclarationNode);
            return;
        case 'Assignment':
            this.executeAssignment2(statement.body as AssignmentNode);
            return;
        case 'StringLiteral':
        case 'NumberLiteral':
        case 'Identifier':
        case 'Expression':
            // execute
            return this.executeExpressionNode(statement.body as ExpressionNode);
        }
        throw new Error('Unexpected statement');
    }

    private executeAssignment2 = (node: AssignmentNode) => {
        console.log('asdasdasdasd');
        const id = node.identifier.value;
        const value = this.executeExpressionNode(node.expression as ExpressionNode);
        this._memory.update(id, value);
    };

    private executeDeclaration = (node: DeclarationNode) => {
        const typeOfAssignment = node.declaratorType;
        const id = node.assignmentNode.identifier.value;
        const value = this.executeAssignment(node.assignmentNode);
        this._memory.set(id, {
            declarationType: typeOfAssignment,
            identifier: id,
            type: 'literal',
            value
        });
    };

    private executeAssignment = (node: AssignmentNode) => {
        return this.executeExpressionNode(node.expression as ExpressionNode);

        switch (node.type) {
        case 'Expression':
            return this.executeExpressionNode(node.expression as ExpressionNode);
        case 'FuncDeclaration':
            throw new Error('not implemented on asignment node func');
        }
        console.log('asdasdasdas', node);
        throw new Error('not implemented on assignment node');
    };

    private executeExpressionNode = (node:ExpressionNode): string | number => {
        console.log('executed expression for node ', node);
        switch (node.type) {
        case 'NumberLiteral':
            return (node as LiteralNode).value;
        case 'StringLiteral':
            return (node as LiteralNode).value;
        case 'Identifier':
            // TODO - return correct type
            return this._memory.get((node as IdentifierNode).value).value as string | number;
        }
        throw new Error('not implemented on expression node');
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