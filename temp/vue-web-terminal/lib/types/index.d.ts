export interface EditorConfig {
    open: boolean;
    focus: boolean;
    value: string;
    onClose: null | Function;
    onFocus?: Function;
    onBlur?: Function;
}
export type Position = {
    x: number;
    y: number;
};
export type DragConfig = {
    width: number;
    height: string;
    zIndex?: string;
    init?: Position;
    pinned?: boolean;
};
export type SearchResult = {
    show: boolean;
    defaultBoxRect: null;
    item?: Command;
};
export type ScreenType = {
    xs?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
};
export type Command = {
    key: string;
    title?: string;
    group?: string;
    usage?: string;
    description?: string;
    example?: Array<CommandExample>;
};
export type CommandExample = {
    cmd: string;
    des?: string;
};
export type CmdHistory = {
    cmdLog: string[];
    cmdIdx: number;
};
export type Options = {
    highlight: object;
    codemirror: object;
};
export type MessageContentTable = {
    head: string[];
    rows: string[][];
};
export type Message = {
    type?: 'normal' | 'json' | 'code' | 'table' | 'html' | 'ansi' | 'cmdLine';
    content: string | number | object | MessageContentTable | Array<any>;
    class?: 'success' | 'error' | 'info' | 'warning' | 'system';
    tag?: string;
    depth?: number;
};
export type AskConfig = {
    isPassword: boolean;
    question: string;
    autoReview: boolean;
    callback?: (value: string) => void;
};
export type CommandStoreSortFunc = (a: any, b: any) => number;
export type InputFilterFunc = (str1: string, str2: string, event: InputEvent) => string | null;
export type CommandFormatterFunc = (cmd: string) => string;
export type CommandModifyFunc = (cmd: string) => any;
export type TabKeyHandlerFunc = (event: Event, rewrite: CommandModifyFunc) => undefined;
export type SearchHandlerCallbackFunc = (cmd: Command) => void;
export type SearchHandlerFunc = (commands: Command[], key: string, callback: SearchHandlerCallbackFunc) => void;
export type TerminalApiListenerFunc = (type: string, options?: any) => any | void;
export type SuccessFunc = (message?: Message | Array<Message> | string | TerminalFlash | TerminalAsk) => void;
export type FailedFunc = (message: string) => void;
export type PushMessageBeforeFunc = (message: Message, name: String) => void;
declare class TerminalCallback {
    onFinishListener: Function;
    finish(): void;
    onFinish(callback: Function): void;
}
export declare class TerminalAsk extends TerminalCallback {
    handler: Function;
    ask(options: AskConfig): void;
    onAsk(callback: (config: AskConfig) => void): void;
}
export declare class TerminalFlash extends TerminalCallback {
    handler: Function;
    flush(msg: string): void;
    onFlush(callback: (msg: string) => void): void;
}
export declare class TerminalStore {
    storageKey: string;
    dataMap: Object;
    constructor(key?: string);
    push(name: string, cmd: string): void;
    store(): void;
    getData(name: string): CmdHistory;
    getLog(name: string): string[];
    clear(name: string): void;
    clearAll(): void;
    getIdx(name: string): number;
    setIdx(name: string, idx: number): void;
}
export interface TerminalApiData {
    pool: {
        [key: string]: TerminalApiListenerFunc;
    };
    options?: Options;
}
export declare class TerminalApi {
    data: TerminalApiData;
    constructor(data: TerminalApiData);
    post(name: string, event: string, options?: any): any;
    pushMessage(name: string, options: Message | Array<Message> | string): any;
    appendMessage(name: string, options: string): any;
    fullscreen(name: string): any;
    isFullscreen(name: string): any;
    dragging(name: string, options: Position): any;
    execute(name: string, options: string): any;
    focus(name: string, options: boolean): any;
    elementInfo(name: string): any;
    textEditorOpen(name: string, options?: EditorSetting): any;
    textEditorClose(name: string, options?: any): string | any;
    clearLog(name: string, options?: any): any;
}
export interface EditorSetting {
    content: string;
    onClose: Function;
}
export {};
