import { Position } from '../types/Position';

export type LiteralNodeTypes = 'TextLiteral' |
    'NumberLiteral' |
    'NothingLiteral' |
    'Vector2Literal' |
    'Vector3Literal' |
    'BooleanLiteral';

export type NodeTypes = LiteralNodeTypes |
    'ImportStatement' | 
    'IfStatement' |
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
    'FuncDeclaration' |
    'InternalFuncDeclaration' |
    'ReturnStatement' |
    'DataType';

export type DataTypes = 'boolean' | 'text' | 'nothing' |
    'vector2' | 'vector3' | 'func' | 'list' | 'number';

export type MathematicalOperatorTypes = '+' | '-' | '/' | '%' | '*';
export type ComparisonOperatorTypes = '==' | '>=' | '>' | '<' | '<=' | '!=';
export type LogicalOperatorTypes = '&&' | '||';
export type OperatorTypes = MathematicalOperatorTypes | ComparisonOperatorTypes | LogicalOperatorTypes;

export interface Node <T extends NodeTypes = NodeTypes> {
    type: T,
    position: Position
}

export interface BinaryExpressionNode extends Node<'BinaryExpression'> {
    left: LiteralNode | IdentifierNode,
    right: ExpressionNode,
    operator: OperatorTypes
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
    isOptional: boolean,
    dataType: DataTypeNode | null,
    assignmentNode: AssignmentNode,
}

export interface StatementNode extends Node<'Statement'> {
    body: DeclarationNode | AssignmentNode | ExpressionNode | ReturnStatementNode | IfStatementNode | ImportStatementNode
}

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

export interface GenericFuncDeclarationNode extends Node<'FuncDeclaration' | 'InternalFuncDeclaration'> {
    parameters: ParamsNode | null,
}

export interface FuncDeclarationNode extends GenericFuncDeclarationNode {
    type: 'FuncDeclaration',
    body: CodeBlockNode
}

export interface InternalFuncDeclarationNode extends GenericFuncDeclarationNode {
    type: 'InternalFuncDeclaration',
    identifier: string,
}

export interface CodeBlockNode extends Node<'CodeBlock'> {
    // extra -> return
    body: Array<StatementNode>
}

export interface ReturnStatementNode extends Node<'ReturnStatement'> {
    value: ExpressionNode
}

export interface IfStatementNode extends Node<'IfStatement'> {
    condition: ExpressionNode,
    trueExpression: CodeBlockNode,
    falseExpression: CodeBlockNode | null
}

export interface ImportStatementNode extends Node<'ImportStatement'> {
    value: TextLiteralNode
}

/** Terminal Nodes **/
export interface DataTypeNode extends Node<'DataType'> {
    value: DataTypes,
}

export interface TerminatorNode extends Node<'Terminator'> {
    value: '🦆';
}

export type LiteralNode<T extends LiteralNodeTypes = LiteralNodeTypes> = Node<T>;

export type NothingLiteralNode = LiteralNode<'NothingLiteral'>;

export interface BooleanLiteralNode extends LiteralNode<'BooleanLiteral'> {
    value: boolean
}

export interface NumberLiteralNode extends LiteralNode<'NumberLiteral'> {
    value: number
}

export interface TextLiteralNode extends LiteralNode<'TextLiteral'> {
    value: string
}

export interface Vector2LiteralNode extends LiteralNode<'Vector2Literal'> {
    x: NumberLiteralNode,
    y: NumberLiteralNode
}

export interface Vector3LiteralNode extends Vector2LiteralNode {
    z: NumberLiteralNode,
}