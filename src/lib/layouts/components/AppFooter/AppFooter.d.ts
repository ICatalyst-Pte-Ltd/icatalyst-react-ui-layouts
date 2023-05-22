/// <reference types="react" />
import { FooterProps } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "titleContent" | "toolbar" | "link" | "linkImage" | "linkText" | "linkIcon" | "contentText", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface AppFooterProps extends Omit<FooterProps, 'classes'> {
    classes?: Partial<ReturnType<typeof useStyles>['classes']>;
    showOrganisationInfo?: boolean;
    showFooterInfo?: boolean;
    organisationInfo: {
        author: string;
        url: string;
        name: string;
        logo: string;
    };
}
export declare const AppFooter: import("react").ForwardRefExoticComponent<Omit<AppFooterProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default AppFooter;
