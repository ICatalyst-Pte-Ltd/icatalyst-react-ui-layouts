import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "animated" | "default" | "animated_simple", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export type NavbarToggleButtonIcon = {
    icon: string;
    text: string;
};
export type NavbarToggleButtonIcons = {
    pinIcon: NavbarToggleButtonIcon;
    closeIcon: NavbarToggleButtonIcon;
};
export interface NavbarToggleButtonProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    folded?: boolean;
    icon?: string;
    title?: string;
    actionName: string;
    icons: NavbarToggleButtonIcons;
    ariaControls: string;
    variant?: 'default' | 'animated_simple';
}
export declare function NavbarToggleButton({ className, style, classes: classesProp, folded, icon, title, icons, actionName, ariaControls, variant, }: NavbarToggleButtonProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default NavbarToggleButton;
