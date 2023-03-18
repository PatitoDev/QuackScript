
export type NodeTypes = 'StringLiteral' |
    'NumberLiteral' |
    'BinaryExpression' |
    'Expression' |
    'Module' |
    'Terminator' |
    'Identifier' |
    'AssignmentOperator' |
    'Assignment' |
    'Declaration' |
    'Statement' |
    'Return' |
    'Args' |
    'FuncCallNode' |
    'CodeBlock' |
    'FuncDeclaration';

export type OperatorTypes = '+' | '-' | '/' | '%' | '*';

export interface Node {
    type: NodeTypes
}

export interface Module extends Node {
    body: Array<BinaryExpressionNode>
}

export interface BinaryExpressionNode extends Node {
    left: LiteralNode<string | number> | IdentifierNode,
    right: ExpressionNode,
    operator: OperatorTypes
}

export interface LiteralNode<T = string | number> extends Node {
    value: T,
    raw: string
}

export interface TerminatorNode extends Node {
    value: '🦆';
}

export interface IdentifierNode extends Node {
    value: string;
}

export type ExpressionNode = BinaryExpressionNode |
    LiteralNode<string | number> |
    IdentifierNode |
    FuncCallNode;

export interface AssignmentOperatorNode extends Node {
    value: string;
}

export interface AssignmentNode extends Node {
    identifier: IdentifierNode,
    expression: ExpressionNode | FuncDeclarationNode
}

export interface DeclarationNode extends Node {
    declaratorType: 'constant' | 'variable',
    assignmentNode: AssignmentNode,
}

export interface StatementNode extends Node {
    body: DeclarationNode | AssignmentNode | ExpressionNode
}

export interface ReturnNode extends Node {
    type: 'Return',
}

export interface ModuleNode extends Node {
    statements: Array<StatementNode>
}

export interface ArgsNode extends Node {
    left: ExpressionNode,
    right: ArgsNode | null,
}

export interface FuncCallNode extends Node {
    params: ArgsNode | null,
    identifier: IdentifierNode,
}

export interface FuncDeclarationNode extends Node {
    args: ArgsNode | null,
    body: CodeBlockNode
}

export interface CodeBlockNode extends Node {
    // extra -> return
    body: Array<StatementNode>
}

// <statement> := <expression> <terminator> | <expression> <statement>
export type Statement = Node

