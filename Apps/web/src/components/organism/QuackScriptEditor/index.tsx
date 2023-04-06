import { useEffect, useState } from 'react';
import CodeEditor from '../../molecules/CodeEditor';
import * as S from './style';
// TODO - import npm package
import { Interpreter, Lexer, Parser } from 'quackscript';
import { BooleanLiteralNode, LiteralNode, NumberLiteralNode, TextLiteralNode } from 'quackscript/src/parser/types';

const defaultQuackTextValue = `QUACK exampleFunction <- (:value:) :> {: return value🦆:}🦆

quack optionalVariableTest?:text🦆
optionalVariableTest <- 'hello world'🦆

exampleFunction(:'this is quackscript':)🦆
exampleFunction(:'in action':)🦆

QUACK add <- (:first, second:) :> {:
    return first + second🦆
:}🦆

add(:5, 8:)🦆
quackprint(:optionalVariableTest:)🦆
`;

const lexer = new Lexer();
const parser = new Parser();

const QuackScriptEditor = () => {
    const [quackCode, setQuackCode] = useState<string>(defaultQuackTextValue);
    const [codeOutcome, setCodeOutcome] = useState<string>('');
    const [interpreter, setInterpreter] = useState(new Interpreter());

    const onQuackCodeChange = (value:string | undefined) => {
        const valueWithoutSemicolons = value?.replaceAll(';', '🦆');
        
        setQuackCode(valueWithoutSemicolons ?? '');
    };

    useEffect(() => {
        setInterpreter(new Interpreter((value) => {
            setCodeOutcome((pre) => {
                let valueToPrint = '';
                switch (value.type) {
                case 'BooleanLiteral':
                    valueToPrint = (value as BooleanLiteralNode).value.toString();
                    break;
                case 'TextLiteral':
                    valueToPrint = (value as TextLiteralNode).value;
                    break;
                case 'NumberLiteral':
                    valueToPrint = `${(value as NumberLiteralNode).value}`;
                    break;
                case 'NothingLiteral':
                    valueToPrint = 'nothing';
                }
                return pre.length ?  pre + '\n' + `${valueToPrint}` : `${valueToPrint}`;
            });
        }));
    }, []);

    useEffect(() => {
        try {
            setCodeOutcome('');
            const tokens = lexer.convertToTokens(quackCode);
            const parsedOutcome = parser.parse(tokens);
            console.log('tree: ', parsedOutcome);
            interpreter.execute(parsedOutcome);
        } catch (e) {
            console.error(e);
            setCodeOutcome((e as Error).message);
        }
    }, [quackCode, interpreter]);

    return (
        <S.Container>
            <S.CodeWindowHeader>
                <S.WindowActionButton variant="red" />
                <S.WindowActionButton variant="yellow" />
                <S.WindowActionButton variant="green" />
            </S.CodeWindowHeader>

            <S.CodeWindowContent>
                <CodeEditor 
                    onChange={onQuackCodeChange}
                    value={quackCode} 
                    language="quackscript" />
                <CodeEditor
                    height='20em'
                    language='json'
                    value={codeOutcome}
                />
            </S.CodeWindowContent>
        </S.Container>
    );
};

export default QuackScriptEditor;