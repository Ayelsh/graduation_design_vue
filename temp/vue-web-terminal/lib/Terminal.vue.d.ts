import { PropType } from "vue";
import { Command, CommandFormatterFunc, CommandStoreSortFunc, DragConfig, EditorSetting, InputFilterFunc, Message, PushMessageBeforeFunc, SearchHandlerFunc, TabKeyHandlerFunc } from "./types";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    initLog: {
        type: {
            (arrayLength: number): Message[];
            (...items: Message[]): Message[];
            new (arrayLength: number): Message[];
            new (...items: Message[]): Message[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => Message[];
    };
    context: {
        type: StringConstructor;
        default: string;
    };
    contextSuffix: {
        type: StringConstructor;
        default: string;
    };
    commandStore: {
        (arrayLength: number): Command[];
        (...items: Command[]): Command[];
        new (arrayLength: number): Command[];
        new (...items: Command[]): Command[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    commandStoreSort: PropType<CommandStoreSortFunc>;
    autoHelp: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableExampleHint: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputFilter: PropType<InputFilterFunc>;
    dragConf: PropType<DragConfig>;
    commandFormatter: PropType<CommandFormatterFunc>;
    tabKeyHandler: PropType<TabKeyHandlerFunc>;
    searchHandler: PropType<SearchHandlerFunc>;
    scrollMode: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 在 push 消息之前触发的钩子函数，只能对message对象的属性进行修改
     *
     * @param message 命令对象
     * @param name terminal name
     */
    pushMessageBefore: PropType<PushMessageBeforeFunc>;
    logSizeLimit: {
        type: NumberConstructor;
        default: number;
    };
    enableDefaultCommand: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    pushMessage: (message: string | Message | Message[]) => void;
    fullscreen: () => void;
    isFullscreen: () => boolean;
    dragging: (x: number, y: number) => void;
    execute: (cmd: string) => any;
    focus: (enforceFocus?: boolean | MouseEvent) => void;
    elementInfo: () => any;
    textEditorOpen: (options?: EditorSetting) => any;
    textEditorClose: (options: any) => string;
    clearLog: (clearHistory: boolean) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("on-click" | "on-keydown" | "before-exec-cmd" | "exec-cmd" | "destroyed" | "init-before" | "init-complete" | "on-active" | "on-inactive")[], "on-click" | "on-keydown" | "before-exec-cmd" | "exec-cmd" | "destroyed" | "init-before" | "init-complete" | "on-active" | "on-inactive", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    initLog: {
        type: {
            (arrayLength: number): Message[];
            (...items: Message[]): Message[];
            new (arrayLength: number): Message[];
            new (...items: Message[]): Message[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => Message[];
    };
    context: {
        type: StringConstructor;
        default: string;
    };
    contextSuffix: {
        type: StringConstructor;
        default: string;
    };
    commandStore: {
        (arrayLength: number): Command[];
        (...items: Command[]): Command[];
        new (arrayLength: number): Command[];
        new (...items: Command[]): Command[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    commandStoreSort: PropType<CommandStoreSortFunc>;
    autoHelp: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableExampleHint: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputFilter: PropType<InputFilterFunc>;
    dragConf: PropType<DragConfig>;
    commandFormatter: PropType<CommandFormatterFunc>;
    tabKeyHandler: PropType<TabKeyHandlerFunc>;
    searchHandler: PropType<SearchHandlerFunc>;
    scrollMode: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 在 push 消息之前触发的钩子函数，只能对message对象的属性进行修改
     *
     * @param message 命令对象
     * @param name terminal name
     */
    pushMessageBefore: PropType<PushMessageBeforeFunc>;
    logSizeLimit: {
        type: NumberConstructor;
        default: number;
    };
    enableDefaultCommand: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onOn-click"?: (...args: any[]) => any;
    "onOn-keydown"?: (...args: any[]) => any;
    "onBefore-exec-cmd"?: (...args: any[]) => any;
    "onExec-cmd"?: (...args: any[]) => any;
    onDestroyed?: (...args: any[]) => any;
    "onInit-before"?: (...args: any[]) => any;
    "onInit-complete"?: (...args: any[]) => any;
    "onOn-active"?: (...args: any[]) => any;
    "onOn-inactive"?: (...args: any[]) => any;
}, {
    title: string;
    name: string;
    initLog: Message[];
    context: string;
    contextSuffix: string;
    autoHelp: boolean;
    showHeader: boolean;
    enableExampleHint: boolean;
    scrollMode: string;
    logSizeLimit: number;
    enableDefaultCommand: boolean;
}, {}>, {
    header?(_: {}): any;
    normal?(_: {
        message: {
            type?: "normal" | "json" | "code" | "table" | "html" | "ansi" | "cmdLine";
            content: string | number | object | any[] | {
                head: string[];
                rows: string[][];
            };
            class?: "success" | "error" | "info" | "warning" | "system";
            tag?: string;
            depth?: number;
        };
    }): any;
    json?(_: {
        message: {
            type?: "normal" | "json" | "code" | "table" | "html" | "ansi" | "cmdLine";
            content: string | number | object | any[] | {
                head: string[];
                rows: string[][];
            };
            class?: "success" | "error" | "info" | "warning" | "system";
            tag?: string;
            depth?: number;
        };
    }): any;
    code?(_: {
        message: {
            type?: "normal" | "json" | "code" | "table" | "html" | "ansi" | "cmdLine";
            content: string | number | object | any[] | {
                head: string[];
                rows: string[][];
            };
            class?: "success" | "error" | "info" | "warning" | "system";
            tag?: string;
            depth?: number;
        };
    }): any;
    table?(_: {
        message: {
            type?: "normal" | "json" | "code" | "table" | "html" | "ansi" | "cmdLine";
            content: string | number | object | any[] | {
                head: string[];
                rows: string[][];
            };
            class?: "success" | "error" | "info" | "warning" | "system";
            tag?: string;
            depth?: number;
        };
    }): any;
    html?(_: {
        message: {
            type?: "normal" | "json" | "code" | "table" | "html" | "ansi" | "cmdLine";
            content: string | number | object | any[] | {
                head: string[];
                rows: string[][];
            };
            class?: "success" | "error" | "info" | "warning" | "system";
            tag?: string;
            depth?: number;
        };
    }): any;
    flash?(_: {
        content: any;
    }): any;
    helpCmd?(_: {
        item: {
            key: string;
            title?: string;
            group?: string;
            usage?: string;
            description?: string;
            example?: {
                cmd: string;
                des?: string;
            }[];
        };
    }): any;
    helpBox?(_: {
        showHeader: boolean;
        item: {
            key: string;
            title?: string;
            group?: string;
            usage?: string;
            description?: string;
            example?: {
                cmd: string;
                des?: string;
            }[];
        };
    }): any;
    textEditor?(_: {
        data: {
            open: boolean;
            focus: boolean;
            value: string;
            onClose: Function;
            onFocus?: Function;
            onBlur?: Function;
        };
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
