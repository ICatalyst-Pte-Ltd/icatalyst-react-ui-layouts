import { BaseComponent } from '@icatalyst/react-ui-components';
type StyleProps = {
    color: string;
};
declare const useStyles: (params: StyleProps, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "header" | "text" | "textLocal" | "avatar" | "displayName" | "time", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export type ChatUser = {
    id: string;
    displayName: string;
    avatar: string;
    color: string;
};
export type ChatMessage = {
    message: string;
    timestamp: number;
    user: ChatUser;
    local?: boolean;
};
export interface UserMessageProps extends BaseComponent<'div', Partial<ReturnType<typeof useStyles>['classes']>> {
    message: ChatMessage;
}
export declare function UserMessage({ className, style, classes: classesProp, message, }: UserMessageProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default UserMessage;
