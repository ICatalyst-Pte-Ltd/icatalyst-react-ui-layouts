import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "toolbarTitle" | "divider" | "contentWrapper" | "contentWrapperExpanded" | "messages" | "input", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface ChatProps extends BaseComponent<'div', Partial<ReturnType<typeof useStyles>['classes']>> {
    open: boolean;
    host: string;
    namespace: string;
}
export declare function Chat({ className, style, classes: classesProp, open, host, namespace, }: ChatProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default Chat;
