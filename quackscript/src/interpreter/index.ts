import { BinaryExpressionNode, ExpressionNode, IdentifierNode, LiteralNode, Module } from '../parser/types';

export default class Interpreter {

    public execute(tree: Module) {
        for (const node of tree.body) {
            return this.dfsInOrder(node);
        }
    }

    private dfsInOrder = (node: BinaryExpressionNode | LiteralNode<string | number> | IdentifierNode | ExpressionNode): number => {
        if (node.type === 'NumberLiteral') {
            return (node as LiteralNode<number>).value;
        }

        if (node.type === 'BinaryExpression') {
            const { left, right, operator } = node as BinaryExpressionNode;
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
}