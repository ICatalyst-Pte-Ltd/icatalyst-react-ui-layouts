import { ComponentAlignmentHorizontal, ComponentAlignmentVertical, ComponentColor, ContextPanelPosition, LayoutContainerProps, LayoutDefinition } from '@icatalyst/react-ui-components';
import { Theme } from '@mui/material';
export type EmptyLayoutDefinitionProps = LayoutDefinition & {
    name: 'empty';
    theme: {
        main: string;
        panel: string;
        dialog: string;
        footer: string;
    };
    contextPanel: {
        display: boolean;
        position: ContextPanelPosition;
    };
    messages: {
        position: {
            vertical: Exclude<ComponentAlignmentVertical, 'center'>;
            horizontal: ComponentAlignmentHorizontal;
        };
    };
    footer: {
        display: boolean;
        elevation?: number;
        color?: Exclude<ComponentColor, 'action' | 'disabled' | 'error' | 'warning' | 'info' | 'success'>;
    };
};
export declare const EmptyLayoutDefaults: EmptyLayoutDefinitionProps;
declare const useStyles: (params: LayoutDefinition<string> & {
    name: 'empty';
    theme: {
        main: string;
        panel: string;
        dialog: string;
        footer: string;
    };
    contextPanel: {
        display: boolean;
        position: ContextPanelPosition;
    };
    messages: {
        position: {
            vertical: Exclude<ComponentAlignmentVertical, 'center'>;
            horizontal: ComponentAlignmentHorizontal;
        };
    };
    footer: {
        display: boolean;
        elevation?: number;
        color?: Exclude<ComponentColor, 'action' | 'disabled' | 'error' | 'warning' | 'info' | 'success'>;
    };
} & {
    mainTheme?: Theme | undefined;
}, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "contentWrapper", string>;
    theme: Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface EmptyLayoutProps extends LayoutContainerProps<EmptyLayoutDefinitionProps, Partial<ReturnType<typeof useStyles>['classes']>> {
}
export declare function EmptyLayout({ className, style, classes: classesProp, layoutConfig, }: EmptyLayoutProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default EmptyLayout;
