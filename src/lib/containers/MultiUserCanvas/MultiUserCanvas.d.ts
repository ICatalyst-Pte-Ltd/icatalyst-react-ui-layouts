import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "userAvatar", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface MultiUserCanvasProps extends BaseComponent<'div', Partial<ReturnType<typeof useStyles>['classes']>> {
    host: string;
    namespace: string;
    debounce: number;
}
export declare function MultiUserCanvas({ className, style, classes: classesProp, host, namespace, debounce, }: MultiUserCanvasProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default MultiUserCanvas;
