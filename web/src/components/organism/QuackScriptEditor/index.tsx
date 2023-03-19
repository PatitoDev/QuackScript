import { useState } from 'react';
import CodeEditor from '../../molecules/CodeEditor';
import * as S from './style';
// TODO - import npm package
import { Interpreter, Lexer, Parser, Transpiler } from '../../../../../quackscript/src';

const defaultQuackTextValue = 'QUACK test <- \'hello world\'🦆\n\nquackprint(:test:)🦆\n\nquack a <- (:b:) :> {:\n\tquackprint(:test:)🦆\n:}🦆';

const transpiler = new Transpiler();
const lexer = new Lexer();
const parser = new Parser();
const interpreter = new Interpreter();

const QuackScriptEditor = () => {
    const [quackCode, setQuackCode] = useState<string>(defaultQuackTextValue);

    const onQuackCodeChange = (value:string | undefined) => {
        setQuackCode(value ?? '');
    };

    let js = '';
    try {
        const tokens = lexer.convertToTokens(quackCode);
        const parsedOutcome = parser.parse(tokens);
        console.log('tree: ', parsedOutcome);
        if (parsedOutcome) {
            //js = JSON.stringify(parsedOutcome);
        }
        const result = interpreter.execute(parsedOutcome);
        //console.log('outcome: ', result);

        //js = transpiler.transpile(quackCode);
        js = String(result) ?? 'NULL';
    } catch (e) {
        console.error(e);
        js = (e as Error).message;
    }

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
                    value={defaultQuackTextValue} 
                    language="quackscript" />
                <CodeEditor
                    height='20em'
                    language='json'
                    value={js}
                />
            </S.CodeWindowContent>
        </S.Container>
    );
};

export default QuackScriptEditor;