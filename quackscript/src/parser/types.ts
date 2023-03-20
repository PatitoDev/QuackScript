
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
    'Params' |
    'FuncCallNode' |
    'CodeBlock' |
    'FuncDeclaration';

export type OperatorTypes = '+' | '-' | '/' | '%' | '*';

export interface Node <T extends NodeTypes = NodeTypes> {
    type: T
}

export interface BinaryExpressionNode extends Node<'BinaryExpression'> {
    left: LiteralNode<string | number> | IdentifierNode,
    right: ExpressionNode,
    operator: OperatorTypes
}

export interface LiteralNode<T = string | number> extends Node<'StringLiteral' | 'NumberLiteral'> {
    value: T,
    raw: string
}

export interface TerminatorNode extends Node<'Terminator'> {
    value: '🦆';
}

export interface IdentifierNode extends Node<'Identifier'> {
    value: string;
}

export interface ExpressionNode extends Node<'Expression'> {
    body: BinaryExpressionNode | LiteralNode | IdentifierNode | FuncCallNode | FuncDeclarationNode
}

export interface AssignmentOperatorNode extends Node<'AssignmentOperator'> {
    value: string;
}

export interface AssignmentNode extends Node<'Assignment'> {
    identifier: IdentifierNode,
    expression: ExpressionNode
}

export interface DeclarationNode extends Node<'Declaration'> {
    declaratorType: 'constant' | 'variable',
    assignmentNode: AssignmentNode,
}

export interface StatementNode extends Node<'Statement'> {
    body: DeclarationNode | AssignmentNode | ExpressionNode
}

export type ReturnNode = Node<'Return'>

export interface ModuleNode extends Node<'Module'> {
    statements: Array<StatementNode>
}

export interface ArgsNode extends Node<'Args'> {
    args: Array<ExpressionNode>,
}

/* Declaration */
export interface ParamsNode extends Node<'Params'> {
    params: Array<IdentifierNode>,
}

export interface FuncCallNode extends Node<'FuncCallNode'> {
    params: ArgsNode | null,
    identifier: IdentifierNode,
}

export interface FuncDeclarationNode extends Node<'FuncDeclaration'> {
    parameters: ParamsNode | null,
    body: CodeBlockNode
}

export interface CodeBlockNode extends Node<'CodeBlock'> {
    // extra -> return
    body: Array<StatementNode>
}

// <statement> := <expression> <terminator> | <expression> <statement>
export type Statement = Node
