import { Token } from '../lexer';
import { Cursor } from './tokenCursor';
import { 
    AssignmentNode, AssignmentOperatorNode, BinaryExpressionNode, 
    DeclarationNode, ExpressionNode,
    FuncCallNode,
    IdentifierNode, LiteralNode, ModuleNode, OperatorTypes,
    ArgsNode,
    StatementNode, TerminatorNode, FuncDeclarationNode, CodeBlockNode, ParamsNode } from './types';


export default class Parser {

    private isOperator = (token: Token) => (
        token.type === 'ADDITION' ||
        token.type === 'SUBTRACTION' ||
        token.type === 'MULTIPLICATION' ||
        token.type === 'MODULUS' ||
        token.type === 'DIVISION'
    );

    /*
        can be replaced with just literal
        <terminal-expression> :== <literal> // <func> <var call>
    */
    private terminalExpression = () => {
        return this.literal() || this.identifier();
    };

    /*
        <terminator> := 🦆
    */
    private terminator = (): TerminatorNode | null => {
        const token = this._cursor.readCurrentToken();

        if (token && token.type === 'TERMINATOR') {
            this._cursor.advanceCursor(1);
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
    private literal = () => {
        const token = this._cursor.readCurrentToken();
        if (!token) return null;

        if (token.type === 'NUMBER'){
            this._cursor.advanceCursor(1);
            return {
                raw: token.value,
                type: 'NumberLiteral',
                value: Number(token.value)
            } as LiteralNode<number>;
        }
    
        if (token.type === 'TEXT'){
            this._cursor.advanceCursor(1);
            return {
                raw: token.value,
                type: 'StringLiteral',
                value: token.value
            } as LiteralNode<string>;
        }

        return null;
    };

    /*
        <identifier> := string
    */
    private identifier = () => {
        const token = this._cursor.readCurrentToken(); 

        if (!token || token.type !== 'IDENTIFIER') return null;
        const node:IdentifierNode = {
            type: 'Identifier',
            value: token.value
        };
        this._cursor.advanceCursor(1);
        return node;
    };

    /*
        <operator> := + | - | * | %
    */
    private operator = () => {
        const token = this._cursor.readCurrentToken();
        if (!token) return null;
        
        if (this.isOperator(token)){ 
            this._cursor.advanceCursor(1);
            return token.value as OperatorTypes;
        }

        return null;
    };

    /*
        <params> := <expression> <comma> <params> | <expression>
    */
    private args = () => {
        const firstNode = this._cursor.readCurrentToken();
        if (!firstNode) return null;

        const expressionNode = this.expression();
        if (!expressionNode) return null;

        const paramNode:ArgsNode = {
            type: 'Args',
            args: [expressionNode],
        };

        const commaToken = this._cursor.readCurrentToken();
        if (commaToken?.type === 'COMMA') {
            this._cursor.advanceCursor(1);
            const rightParam = this.args();
            if (!rightParam) throw new Error('Expecting parameter');
            paramNode.args = [...paramNode.args, ...rightParam.args];
        }

        return paramNode;
    };

    /*
        <code-block> := {: <statement> :}
    */
    private codeBlock = (): CodeBlockNode | null => {
        const leftBracket = this._cursor.readCurrentToken();
        if (leftBracket?.type !== 'CURLY_BRACKET_OPEN') return null;
        this._cursor.advanceCursor(1);
    
        const body: Array<StatementNode> = [];
        let nextStatement: StatementNode | null = null;
        do {
            nextStatement = this.statement();
            if (nextStatement) {
                body.push(nextStatement);
            }
        } while (nextStatement !== null);
    
        const rightBracket = this._cursor.readCurrentToken();
        if (rightBracket?.type !== 'CURLY_BRACKET_CLOSE') {
            throw new Error(`Expected :} but found ${rightBracket?.value}`);
        }
        this._cursor.advanceCursor(1);
    
        return {
            body,
            type: 'CodeBlock'
        };
    };

    /*
        <params> := <identifier> <comma> <params> | <identifier>
    */
    private params = ():ParamsNode | null => {
        const id = this._cursor.readCurrentToken();
        if (id?.type !== 'IDENTIFIER') return null;

        const identifierNode:IdentifierNode = {
            type: 'Identifier',
            value: id.value,
        };

        const paramNode:ParamsNode = {
            params: [identifierNode],
            type: 'Params'
        };
        this._cursor.advanceCursor(1);

        const comma = this._cursor.readCurrentToken();
        if (comma?.type === 'COMMA'){
            this._cursor.advanceCursor(1);
            const nextParam = this.params();
            if (nextParam) {
                paramNode.params = [...paramNode.params, ...nextParam.params];
            }
        }

        return paramNode;
    };

    /*
        <func-declaration> := (:<params>:) :> <code-block>
    */
    private funcDeclaration = (): FuncDeclarationNode | null => {
        const currentToken = this._cursor.readCurrentToken();
        if (currentToken?.type !== 'BRACKET_OPEN') return null;
    
        this._cursor.advanceCursor(1);
        const params = this.params();
        
        const rightBracket = this._cursor.readCurrentToken();
        if (rightBracket?.type !== 'BRACKET_CLOSE') {
            throw new Error(`Expecting :) but found ${rightBracket?.value}`);
        }
        this._cursor.advanceCursor(1);

        const arrowFunctionOperator = this._cursor.readCurrentToken();
        if (arrowFunctionOperator?.type !== 'ARROW_FUNCTION') {
            throw new Error(`Expecting :> but found ${arrowFunctionOperator?.value}`);
        }
        this._cursor.advanceCursor(1);

        const codeBlock = this.codeBlock();
        if (!codeBlock) {
            throw new Error(`Expected code block but found ${this._cursor.readCurrentToken()?.value}`);
        }

        return {
            parameters: params,
            body: codeBlock,
            type: 'FuncDeclaration'
        };
    };

    /*
        <func> := <identifier> <bracket-open> <params> <bracket-close> 
    */
    private funcCall = (): FuncCallNode | null => {
        const firstNode = this._cursor.readCurrentToken();
        const secondNode = this._cursor.lookAhead(1);
        const thirdNode = this._cursor.lookAhead(2);
        if (
            !thirdNode ||
            !firstNode ||
            secondNode?.type !== 'BRACKET_OPEN'
        ) {
            return null;
        }
    
        const identifierNode = this.identifier();
        if (!identifierNode) return null;

        this._cursor.advanceCursor(1);
        const params = this.args();
    
        const nextToken = this._cursor.readCurrentToken();
        if (nextToken?.type !== 'BRACKET_CLOSE') {
            throw new Error(`Expected :) but found ${nextToken?.value}`);
        }
        this._cursor.advanceCursor(1);

        return {
            identifier: identifierNode,
            params: params,
            type: 'FuncCallNode'
        };
    };

    /*
        <binary-expression> :== <terminal-expression> <operator> <expression>
    */
    private binaryExpression = (): BinaryExpressionNode | null => {
        const firstToken = this._cursor.readCurrentToken();
        const secondToken = this._cursor.lookAhead(1);
        const thirdToken = this._cursor.lookAhead(2);
        if (!firstToken || !secondToken || !thirdToken) return null;

        if (!this.isOperator(secondToken)) return null;

        const parsedFirstToken = this.terminalExpression();
        if (!parsedFirstToken) return null;

        const parsedSecondToken = this.operator(); // TODO - cursor has advanced revert back?
        if (!parsedSecondToken) return null;

        const parsedThirdToken = this.expression();
        if (!parsedThirdToken) throw new Error(`expected literal found ${thirdToken.value}`);

        const expression: BinaryExpressionNode = {
            left: parsedFirstToken,
            right: parsedThirdToken,
            operator: parsedSecondToken,
            type: 'BinaryExpression'
        };
        
        return expression;
    };

    /*
        <expression> :== <binary-expression> | <literal> | <func-call> | <func-declaration> | <identifier>
    */
    private expression = (): ExpressionNode | null => {
        const parsedBinaryExpression = this.binaryExpression();
        if (parsedBinaryExpression) {
            return {
                type: 'Expression',
                body: parsedBinaryExpression
            };
        }

        const funcCallNode = this.funcCall();
        if (funcCallNode) {
            return {
                body: funcCallNode,
                type: 'Expression'
            };
        }

        const funcDeclaration = this.funcDeclaration();
        if (funcDeclaration) {
            return {
                body: funcDeclaration,
                type: 'Expression'
            };
        }

        const parsedIdentifier = this.identifier();
        if (parsedIdentifier) {
            return {
                body: parsedIdentifier,
                type: 'Expression'
            };
        }

        const parsedLiteral = this.literal();
        if (parsedLiteral) {
            return {
                body: parsedLiteral,
                type: 'Expression'
            };
        }

        return null;
    };

    /*
        <assignment-operator> := <-
    */
    private assignMentOperator = (): AssignmentOperatorNode | null => {
        const token = this._cursor.readCurrentToken();
        if (!token || token.type !== 'ASSIGNMENT_OPERATOR') return null;
        this._cursor.advanceCursor(1);
        const node:AssignmentOperatorNode = {
            type: 'AssignmentOperator',
            value: token.value
        };
        return node;
    };


    /*
        test <- liter🦆
        <assignment-body> := <expression> | <func-declaration>
        <assignment> := <identifier> <assignment-operator> <assignment-body>
    */
    private assignment = (): AssignmentNode | null => {
        const currentToken = this._cursor.readCurrentToken();
        const secondNode = this._cursor.lookAhead(1);
        if (!currentToken || !secondNode) return null;
        if (secondNode.type !== 'ASSIGNMENT_OPERATOR') return null;

        const identifierNode = this.identifier();
        if (!identifierNode) return null;

        const thirdNode = this._cursor.lookAhead(2);
        if (!secondNode || !thirdNode) return null;

        const assignmentOperator = this.assignMentOperator();
        if (!assignmentOperator) return null;

        const assignmentBody = this.expression();
        if (assignmentBody === null) return null;

        return {
            expression: assignmentBody,
            identifier: identifierNode,
            type: 'Assignment'
        };
    };

    /*
        QUACK test <-> liter🦆
        <declaration> := <declaration-operator> <assignment>
    */
    private declaration = (): DeclarationNode | null => {
        const token = this._cursor.readCurrentToken();
        if (
            !token ||
            (token.type !== 'ASSIGNMENT_LET' &&
            token.type !== 'ASSIGNMENT_CONST')
        ) return null;

        let assignmentType: DeclarationNode['declaratorType'] = 'variable';
        if (token.type === 'ASSIGNMENT_CONST') {
            assignmentType = 'constant';
        }

        const nextNode = this._cursor.lookAhead(1);
        if (!nextNode) throw new Error('expected assignment');
        this._cursor.advanceCursor(1);

        const assignmentNode = this.assignment();
        if (!assignmentNode) throw new Error(`expected assignment found ${nextNode.value}`);

        return {
            declaratorType: assignmentType,
            type: 'Declaration',
            assignmentNode
        };
    };

    /*
        <statement> := <declaration> <terminator> | <assignment> <terminator> | <expression> <terminator>
    */
    private statement = (): StatementNode | null => {
        const firstToken = this._cursor.readCurrentToken();
        if (!firstToken) return null;

        const declaration = this.declaration();
        let generatedNode:StatementNode | null = null;

        if (declaration) {
            generatedNode = {
                body: declaration,
                type: 'Statement'
            };
        }

        if (!generatedNode) {
            const assignment = this.assignment();
            if (assignment) {
                generatedNode = {
                    body: assignment,
                    type: 'Statement'
                };
            }
        }

        if (!generatedNode) {
            const expression = this.expression();
            if (expression) {
                generatedNode = {
                    body: expression,
                    type: 'Statement'
                };
            }
        }

        if (generatedNode) {
            const terminalNode = this.terminator();
            if (!terminalNode) {
                throw new Error(`expected 🦆 but found ${this._cursor.readCurrentToken()?.value ?? 'EOF'}`);
            }
            return generatedNode;
        }

        return null;
    };
    
    private _cursor: Cursor = new Cursor([]);

    public parse = (tokens: Array<Token>) => {
        const excludedWhiteSpace = tokens.filter((t) => t.type !== 'WHITESPACE' && t.type !== 'NEW_LINE');
        console.log(excludedWhiteSpace);
        this._cursor = new Cursor(excludedWhiteSpace);

        const module:ModuleNode = {
            type: 'Module',
            statements: [],
        };

        let hasError = false;
        do  {
            const nextToken = this._cursor.readCurrentToken();
            if (!nextToken) throw new Error(`Something has gone wrong handling the cursor at ${this._cursor.getPosition()}`);
            const nextStatement = this.statement();
            if (nextStatement) {
                module.statements.push(nextStatement);
            }
            if (!nextStatement) {
                hasError = true;
            }
        } while (!this._cursor.hasReachedEnd() && !hasError);

        if (hasError) {
            throw new Error(`expected statement found ${this._cursor.readCurrentToken()?.value}`);
        }

        return module;
    };
}
