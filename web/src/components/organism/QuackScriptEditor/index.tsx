import { useEffect, useRef, useState } from 'react';
import { TbMinusVertical } from 'react-icons/all';
import CodeEditor from '../../molecules/CodeEditor';
import * as S from './style';
// TODO - import npm package
import { Interpreter, Lexer, Parser, Transpiler } from '../../../../../quackscript/src';

const defaultQuackTextValue = 'QUACK test <-> \'hello world\'🦆' + '\nquackprint(:test:)🦆';
const EDITOR_OPTIONS = {
    fontSize: 23,
};


const transpiler = new Transpiler();
const lexer = new Lexer();
const parser = new Parser();
const interpeter = new Interpreter();

const QuackScriptEditor = () => {
    const [quackCode, setQuackCode] = useState<string>(defaultQuackTextValue);
    const [editorSize, setEditorSize] = useState<number>(2000);
    const lastPositionRef = useRef<number | null>(null);

    const onQuackCodeChange = (value:string | undefined) => {
        setQuackCode(value ?? '');
    };

    let js = '';
    try {
        const tokens = lexer.convertToTokens(quackCode);
        const parsedOutcome = parser.parse(tokens);
        console.log('tree: ', parsedOutcome);
        //const result = interpeter.execute(parsedOutcome);
        //console.log('outcome: ', result);

        js = transpiler.transpile(quackCode);
        //js = String(result) ?? 'error';
    } catch (e) {
        js = (e as Error).message;
    }

    const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        lastPositionRef.current = e.screenX;
    };

    useEffect(() => {
        const onMouseMove = (e:MouseEvent) => {
            if (!lastPositionRef.current) return;
            const diff = e.screenX - lastPositionRef.current;
            setEditorSize((prev) => prev + diff);
            lastPositionRef.current = e.screenX;
        };

        const onMouseUp = (e:MouseEvent) => {
            lastPositionRef.current = null;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <S.Container>
            <S.CodeWindowHeader>
                <S.WindowActionButton variant="red" />
                <S.WindowActionButton variant="yellow" />
                <S.WindowActionButton variant="green" />
            </S.CodeWindowHeader>

            <S.CodeWindowContent>
                <CodeEditor 
                    width={editorSize}
                    onChange={onQuackCodeChange}
                    options={{ ...EDITOR_OPTIONS, automaticLayout: true}}
                    value={defaultQuackTextValue} 
                    language="quackscript" />
                <S.Divider onMouseDown={onMouseDown} >
                    <TbMinusVertical size='5em' />
                </S.Divider>
                <CodeEditor
                    options={{ ...EDITOR_OPTIONS, automaticLayout: true}}
                    value={js}
                />
            </S.CodeWindowContent>
        </S.Container>
    );
};

export default QuackScriptEditor;