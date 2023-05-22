import { ComponentAlignmentHorizontal, ComponentAlignmentVertical, ComponentColor, ContextPanelPosition, ImageFit, LayoutContainerProps, LayoutDefinition } from '@icatalyst/react-ui-components';
import { Theme } from '@mui/material';
export type CoverLayoutDefinitionProps = LayoutDefinition & {
    name: 'cover';
    theme: {
        main: string;
        content: string;
        panel: string;
        dialog: string;
        footer: string;
    };
    background: {
        image?: string;
        alpha?: number;
        fit?: ImageFit;
        position?: ComponentAlignmentVertical;
    };
    content: {
        elevation: number;
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
export declare const CoverLayoutDefaults: CoverLayoutDefinitionProps;
declare const useStyles: (params: LayoutDefinition<string> & {
    name: 'cover';
    theme: {
        main: string;
        content: string;
        panel: string;
        dialog: string;
        footer: string;
    };
    background: {
        image?: string;
        alpha?: number;
        fit?: ImageFit;
        position?: ComponentAlignmentVertical;
    };
    content: {
        elevation: number;
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
    classes: Record<"content" | "root" | "contentArea" | "contentWrapper", string>;
    theme: Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface CoverLayoutProps extends LayoutContainerProps<CoverLayoutDefinitionProps, Partial<ReturnType<typeof useStyles>['classes']>> {
}
export declare function CoverLayout({ className, style, classes: classesProp, layoutConfig, }: CoverLayoutProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
export default CoverLayout;
