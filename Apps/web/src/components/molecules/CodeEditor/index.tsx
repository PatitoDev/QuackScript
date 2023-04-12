import Editor, { EditorProps } from '@monaco-editor/react';
import { useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import { useTheme } from 'styled-components';
import './style.css';

const EDITOR_OPTIONS = {
    fontSize: 23,
    automaticLayout: true,
};


interface Word {
    startColumn: number,
    endColumn: number
}

interface Model {
    getWordUntilPosition: (position:Position) => Word,
}

interface Position {
    lineNumber: number,
    startColumn: number,
}

const CodeEditor = (props: EditorProps) => {

    const monaco = useMonaco();
    const theme = useTheme();

    useEffect(() => {
        if (monaco) {
            const hasLanguage = (monaco.languages.getLanguages().find((lang: {id: string}) => lang.id === 'quackscript' ));
            if (!hasLanguage) {
                console.log('added language');
                monaco.languages.register({ id: 'quackscript' });
                monaco.languages.setMonarchTokensProvider('quackscript', {
                    tokenizer: {
                        root: [
                            [/:[a-zA-Z]+/, 'keyword'],
                            [/return /, 'keyword'],
                            [/quack /, 'keyword'],
                            [/QUACK /, 'keyword'],
                            [/[^\s]+?(?=\()/, 'entity.name.function'],
                            [/\(/, 'delimiter.bracket'],
                            [/\)/, 'delimiter.bracket'],
                            [/'.*?'/, 'string'],
                            [/<-/, 'delimiter'],
                            [/</, 'delimiter'],
                            [/>/, 'delimiter'],
                            [/{/, 'delimiter'],
                            [/}/, 'delimiter'],
                            [/\)/, 'delimiter'],
                            [/\(/, 'delimiter'],
                            [/[0-9]/, 'number'],
                            [/[a-zA-Z][a-zA-Z0-9_]*/, 'identifier']
                        ],
                    },
                });

                monaco.editor.defineTheme('quackscript-theme', {
                    base: 'vs',
                    inherit: true,
                    rules: [
                        { token: 'keyword', foreground: '#7B20D7' },
                        { token: 'delimiter', foreground: '#251ccc8d' },
                        { token: 'entity.name.function', foreground: '#251ccc8d', fontStyle: 'bold' },
                    ],
                    colors: {
                        'editor.foreground': theme.colors.black,
                        'editor.background': theme.colors.white,
                        'editorCursor.foreground': theme.colors.black,
                        'editor.lineHighlightBackground': '#3f3f3f15',
                        'editorLineNumber.foreground': theme.colors.black,
                        'editor.selectionBackground': '#3f3f3f15',
                        'editor.inactiveSelectionBackground': '#3f3f3f15',
                    },
                });
                monaco.languages.registerCompletionItemProvider('quackscript', {
                    provideCompletionItems: (model: Model, position:Position ) => {
                        const word = model.getWordUntilPosition(position);
                        const range = {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: word.startColumn,
                            endColumn: word.endColumn,
                        };
                        const suggestions = [
                            {
                                label: 'quack - variable',
                                kind: monaco.languages.CompletionItemKind.Text,
                                insertText: 'quack',
                                range: range,
                            },
                            {
                                label: 'QUACK - constant',
                                kind: monaco.languages.CompletionItemKind.Text,
                                insertText: 'quack',
                                range: range,
                            },
                            {
                                label: 'when',
                                kind: monaco.languages.CompletionItemKind.Text,
                                insertText: 'when',
                                range: range,
                            },
                            {
                                label: 'quackprint',
                                kind: monaco.languages.CompletionItemKind.Text,
                                insertText: 'quackprint',
                                range: range,
                            },
                        ];
                        return { suggestions: suggestions };
                    },
                });
            }
            monaco.editor.setTheme('quackscript-theme');
        }
    }, [monaco]);

    return (
        <Editor 
            height='30em'
            {...props}
            className="editor"
            options={{ ...EDITOR_OPTIONS }}
        />
    );

};

export default CodeEditor;