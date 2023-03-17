import { Token } from '../lexer';

type NodeTypes = 'Literal' | 'BinaryExpression' | 'Expression' | 'Module';
type OperatorTypes = '+' | '-' | '/' | '%' | '*';

export interface Node {
    type: NodeTypes
}

export interface Module extends Node {
    body: Array<BinaryExpressionNode>
}

export interface BinaryExpressionNode extends Node {
    left: BinaryExpressionNode | LiteralNode<string | number>,
    right: BinaryExpressionNode | LiteralNode<string | number> | null,
    operator: OperatorTypes
}

export interface LiteralNode<T = string> extends Node {
    value: T,
    raw: string
}

export default class Parser {

    public parse = (tokens: Array<Token>) => {
        const tree: Module = {
            type: 'Module',
            body: []
        };

        let lastToken: BinaryExpressionNode | LiteralNode<string | number> | null = null; 

        for (const token of tokens) {
            if (token.type === 'NUMBER') {
                if (lastToken?.type === 'BinaryExpression') {
                    const lastBinaryToken = lastToken as BinaryExpressionNode;
                    lastBinaryToken.right = this.parseNumberLiteral(token);
                    continue;
                }
                lastToken = this.parseNumberLiteral(token);
                continue;
            }

            if (
                token.type === 'ADDITION' ||
                token.type === 'SUBTRACTION' ||
                token.type === 'MODULUS' ||
                token.type === 'MULTIPLICATION' ||
                token.type === 'DIVISION'
            ) {
                if (!lastToken) {
                    throw new Error(`Unexpected symbol ${token.value} at line: ${token.placement.line} at character: ${token.placement.char}`);
                }
                const expression:BinaryExpressionNode = {
                    type: 'BinaryExpression',
                    left: lastToken,
                    operator: token.value as OperatorTypes,
                    right: null,
                };
                lastToken = expression;
            }
        }
        if (lastToken?.type === 'BinaryExpression'){
            tree.body.push(lastToken as BinaryExpressionNode);
        }
        return tree;
    };

    public parseNumberLiteral = (token: Token) => {
        const numberLiteralNode: LiteralNode<number> = {
            raw: token.value,
            type: 'Literal',
            value: Number(token.value)
        };
        return numberLiteralNode;
    };
}