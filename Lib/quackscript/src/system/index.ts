
export type OutputStream = (value: string) => void;

export class System {
    public stdout: OutputStream;
    public stderr: OutputStream;
    private _loadFile: ((path: string) => string) | undefined;

    constructor(
        stdOut?: OutputStream,
        stdErr?: OutputStream,
        loadFile?: System['loadFile']) {
        this.stderr = stdErr ?? console.error;
        this.stdout = stdOut ?? console.log;
        this._loadFile = loadFile;
    }

    public loadFile = (path: string): string => {
        if (this._loadFile) {
            return this._loadFile(path);
        }

        throw new Error('not implemented');
    };
}