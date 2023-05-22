import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "avatar" | "avatarSize" | "avatarImageSize" | "logoText" | "hideLogoText", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface AppLogoProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    /**
     * Should the title text be shown
     */
    showTitle?: boolean;
    /**
     * The title text, also used as the logo image alt text
     */
    title: string;
    /**
     * The url to the logo image to display
     */
    logo: string;
}
export declare function AppLogo({ className, style, classes: classesProp, showTitle, title, logo, }: AppLogoProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default AppLogo;
