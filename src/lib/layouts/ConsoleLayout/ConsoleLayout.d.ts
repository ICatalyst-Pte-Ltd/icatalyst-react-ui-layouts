import { ComponentAlignmentHorizontal, ComponentAlignmentVertical, ComponentColor, ContextPanelPosition, LayoutContainerProps, LayoutDefinition } from '@icatalyst/react-ui-components';
import { Theme } from '@mui/material';
import { ComponentType } from 'react';
export type ContentPosition = 'inside' | 'outside';
type AppBarConfig = {
    elevation?: number;
    color?: Exclude<ComponentColor, 'action' | 'disabled' | 'error' | 'warning' | 'info' | 'success'>;
    actions?: ComponentType;
};
type NavbarPosition = ContextPanelPosition | 'toolbar';
type NavbarOrientation = 'horizontal' | 'vertical';
export type ConsoleLayoutDefinitionProps = LayoutDefinition & {
    name: 'console';
    theme: {
        main: string;
        navbar: string;
        toolbar: string;
        footer: string;
        panel: string;
        dialog: string;
    };
    navbar: {
        display: boolean;
        contentPosition: ContentPosition;
        position: NavbarPosition;
        width: number;
        foldedWidth: number;
        flattenNav: boolean;
        folded: boolean;
        header: AppBarConfig;
        shadow: number;
        orientation: NavbarOrientation;
        userInfo: {
            allowProfileClick: boolean;
        };
        navItemVariant: 'rounded' | 'square';
        activeItemEmbelish: boolean;
        maxDepth: number;
        contextNav?: {
            maxDepth: number;
            shadow: number;
        };
    };
    toolbar: {
        display: boolean;
        contentPosition: ContentPosition;
    } & AppBarConfig;
    footer: {
        display: boolean;
        contentPosition: ContentPosition;
    } & AppBarConfig;
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
};
export declare const ConsoleLayoutDefaults: ConsoleLayoutDefinitionProps;
declare const useStyles: (params: LayoutDefinition<string> & {
    name: 'console';
    theme: {
        main: string;
        navbar: string;
        toolbar: string;
        footer: string;
        panel: string;
        dialog: string;
    };
    navbar: {
        display: boolean;
        contentPosition: ContentPosition;
        position: NavbarPosition;
        width: number;
        foldedWidth: number;
        flattenNav: boolean;
        folded: boolean;
        header: AppBarConfig;
        shadow: number;
        orientation: NavbarOrientation;
        userInfo: {
            allowProfileClick: boolean;
        };
        navItemVariant: 'rounded' | 'square';
        activeItemEmbelish: boolean;
        maxDepth: number;
        contextNav?: {
            maxDepth: number;
            shadow: number;
        };
    };
    toolbar: {
        display: boolean;
        contentPosition: ContentPosition;
    } & AppBarConfig;
    footer: {
        display: boolean;
        contentPosition: ContentPosition;
    } & AppBarConfig;
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
} & {
    mainTheme?: Theme | undefined;
    footerHeight?: number | undefined;
    toolbarHeight?: number | undefined;
    navbarHoverOpen?: boolean | undefined;
    navbarResponsive: boolean;
}, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"toolbar" | "root" | "appWrapper" | "contentWrapper" | "contentWrapper_toolbarOutside" | "appNavbar" | "appPanelClipped" | "appBarOverlay" | "appToolbar" | "appToolbar_outside" | "appToolbar_inside" | "appFooter" | "appToolbarTitleWrapper_outside" | "appToolbarTitle_outside" | "navbarToggleButton_outside" | "appLogo_outside" | "appFooter_outside" | "appFooter_inside" | "navbarToolbar" | "footerToolbar" | "footerToolbarFolded" | "footerToolbarLink" | "footerToolbarLinkFolded" | "footerToolbarLinkText" | "footerToolbarLinkTextFolded" | "footerToolbarLinkIcon" | "footerToolbarLinkIconFolded" | "copyrightText" | "copyrightTextFolded" | "contentNavbarToggle", string>;
    theme: Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export type ConsoleLayoutProps = LayoutContainerProps<ConsoleLayoutDefinitionProps, Partial<ReturnType<typeof useStyles>['classes']>>;
export declare function ConsoleLayout({ className, style, classes: classesProp, layoutConfig, }: ConsoleLayoutProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
export default ConsoleLayout;
