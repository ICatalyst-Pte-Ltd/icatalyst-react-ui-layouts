import { LayoutContainerProps, LayoutDefinition } from '@icatalyst/react-ui-components';
import React from 'react';
import { MasterContentProps } from './components/MasterContent';
export type MasterDetailLayout = LayoutDefinition & {
    name: 'masterDetail';
    theme: {
        main: string;
    };
};
export declare const MasterDetailLayoutDefaults: MasterDetailLayout;
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "masterHeader" | "detailHeader" | "errorWrapper", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface MasterDetailLayoutProps extends LayoutContainerProps<MasterDetailLayout, Partial<ReturnType<typeof useStyles>['classes']>> {
    repositoryName: string;
    dataDefinition: string;
    variant?: MasterContentProps['variant'];
}
export type MasterDetailContext = {
    isRootContext: boolean;
    selected: any[];
};
export declare const MasterDetailContext: React.Context<MasterDetailContext>;
export declare function MasterDetailLayout({ className, style, classes: classesProp, layoutConfig, repositoryName, dataDefinition, variant, }: MasterDetailLayoutProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default MasterDetailLayout;
