import Editor, { EditorProps } from '@monaco-editor/react';
import './style.css';

const CodeEditor = (props: EditorProps) => {

    return (
        <Editor 
            height='30em'
            language="typescript"
            {...props}
            className="editor"
        />
    );

};

export default CodeEditor;