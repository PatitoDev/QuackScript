import { Token } from '../lexer';

type NodeTypes = 'StringLiteral' |
    'NumberLiteral' |
    'BinaryExpression' |
    'Expression' |
    'Module' |
    'Terminator' |
    'Identifier' |
    'AssignmentOperator' |
    'Assignment' |
    'Declaration' |
    'Statement';
type OperatorTypes = '+' | '-' | '/' | '%' | '*';

export interface Node {
    type: NodeTypes
}

export interface Module extends Node {
    body: Array<BinaryExpressionNode>
}

export interface BinaryExpressionNode extends Node {
    left: LiteralNode<string | number>,
    right: LiteralNode<string | number> | BinaryExpressionNode,
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

export type ExpressionNode = BinaryExpressionNode | LiteralNode<string | number>;

export interface AssignmentNode extends Node {
    identifier: IdentifierNode,
    expression: ExpressionNode
}

export interface DeclarationNode extends Node {
    declaratorType: 'constant' | 'variable',
    assignmentNode: AssignmentNode,
}

export interface StatementNode extends Node {
    body: DeclarationNode | AssignmentNode | ExpressionNode
}

// <statement> := <expression> <terminator> | <expression> <statement>
export type Statement = Node

export default class Parser {

    /*
        <terminator> := 🦆
    */
    private terminator = (node: Token) => {
        if (node.type === 'TERMINATOR') {
            const result: TerminatorNode = {
                type: 'Terminator',
                value: '🦆',
            };
            return result;
        }
        return null;
    };

    /*
        <literal> := <number> | <string>;
    */
    private literal = (node: Token) => {
        if (node.type === 'NUMBER'){
            return {
                raw: node.value,
                type: 'NumberLiteral',
                value: Number(node.value)
            } as LiteralNode<number>;
        }
    
        if (node.type === 'TEXT'){
            return {
                raw: node.value,
                type: 'StringLiteral',
                value: node.value
            } as LiteralNode<string>;
        }

        return null;
    };

    /*
        <operator> := + | - | * | %
    */
    private operator = (node: Token) => {
        if (
            node.type === 'ADDITION' ||
            node.type === 'SUBTRACTION' ||
            node.type === 'MULTIPLICATION' ||
            node.type === 'MODULUS' ||
            node.type === 'DIVISION'
        ){ 
            return node.value as OperatorTypes;
        }

        return null;
    };

    /*
        <binary-expression> :== <terminal-expression> <operator> <expression>
    */
    private binaryExpression = (firstToken: Token, secondToken: Token, thirdToken: Token) => {
        const parsedFirstToken = this.terminalExpression(firstToken);
        const parsedSecondToken = this.operator(secondToken);
        const parsedThirdToken = this.expression(thirdToken);

        if (!parsedFirstToken || !parsedSecondToken || !parsedThirdToken) {
            throw new Error('Expected stuff');
        }

        const expression: BinaryExpressionNode = {
            left: parsedFirstToken,
            right: parsedThirdToken,
            operator: parsedSecondToken,
            type: 'BinaryExpression'
        };
        
        return expression;
    };

    /*
        <terminal-expression> :== <literal> // <func> <var call>
    */
    private terminalExpression = (node: Token) => {
        return this.literal(node);
    };

    /*
        <expression> :== <binary-expression> | <literal>
    */
    private expression = (firstToken: Token): ExpressionNode | null => {
        const secondToken = this.lookAhead(1);
        const thirdToken = this.lookAhead(2);
        if (secondToken && thirdToken) {
            this.cursor += 2; // TODO - check if this is right
            const parsedBinaryExpression = this.binaryExpression(firstToken, secondToken, thirdToken);
            if (parsedBinaryExpression) {
                return parsedBinaryExpression;
            }
            return null;
        }

        const parsedLiteral = this.literal(firstToken);
        if (!parsedLiteral) {
            return null;
        }
        this.cursor += 1;
        return parsedLiteral;
    };

    /*
        <identifier> := string
    */
    private identifier = (token: Token) => {
        if (token.type !== 'IDENTIFIER') return null;
        const node:IdentifierNode = {
            type: 'Identifier',
            value: token.value
        };
        return node;
    };

    /*
        <assignment-operator> := string
    */
    private assignMentOperator = (token: Token) => {
        if (token.type !== 'ASSIGNMENT_OPERATOR') return null;
        const node:IdentifierNode = {
            type: 'AssignmentOperator',
            value: token.value
        };
        return node;
    };


    /*
        test <-> liter🦆
        <assignment> := <identifier> <assignment-operator> <expression>
    */
    private assignment = (token: Token): AssignmentNode | null => {
        const identifierNode = this.identifier(token);
        if (!identifierNode) return null;
        const secondNode = this.lookAhead(1);
        const thirdNode = this.lookAhead(2);

        if (!secondNode || !thirdNode) return null;
        const assignmentOperator = this.assignMentOperator(secondNode);
        this.cursor += 2;
        const expressionNode = this.expression(thirdNode);
        if (!assignmentOperator || !expressionNode) return null;

        return {
            expression: expressionNode,
            identifier: identifierNode,
            type: 'Assignment'
        };
    };

    /*
        QUACK test <-> liter🦆
        <declaration> := <declaration-operator> <assignment>
    */
    private declaration = (token: Token): DeclarationNode | null => {
        if (
            token.type !== 'ASSIGNMENT_LET' &&
            token.type !== 'ASSIGNMENT_CONST'
        ) return null;

        let assignmentType: DeclarationNode['declaratorType'] = 'variable';
        if (token.type === 'ASSIGNMENT_CONST') {
            assignmentType = 'constant';
        }

        const nextNode = this.readAndMoveToNextToken();
        if (!nextNode) return null;

        const assignmentNode = this.assignment(nextNode);
        if (!assignmentNode) return null;

        return {
            declaratorType: assignmentType,
            type: 'Declaration',
            assignmentNode
        };
    };

    /*
        <statement> := <declaration> <terminator> | <assignment> <terminator> | <expression> <terminator>
    */
    private statement = (firstToken: Token): StatementNode | null => {
        const declaration = this.declaration(firstToken);
        if (declaration) return {
            body: declaration,
            type: 'Statement'
        };

        const assignment = this.assignment(firstToken);
        if (assignment) return {
            body: assignment,
            type: 'Assignment'
        };

        const expression = this.expression(firstToken);
        if (expression) return {
            body: expression,
            type: 'Expression'
        };
        return null;
    };
    

    cursor = 0;
    tokens:Array<Token> = [];

    public parse = (tokens: Array<Token>) => {
        const excludedWhiteSpace = tokens.filter((t) => t.type !== 'WHITESPACE' && t.type !== 'NEW_LINE');
        console.log(tokens);
        this.cursor = 0;
        this.tokens = excludedWhiteSpace;

        const result = this.statement(excludedWhiteSpace[0]!);
        return result;
        //this.readNextToken();
    };

    private readAndMoveToNextToken = () => {
        const currentToken = this.tokens[this.cursor + 1];
        if (!currentToken) {
            // return an empty program?
            throw new Error('Empty program');
        }
        this.cursor += 1;
        return currentToken;
    };

    private lookAhead = (amount: number) => {
        return this.tokens[this.cursor + amount];
    };
}