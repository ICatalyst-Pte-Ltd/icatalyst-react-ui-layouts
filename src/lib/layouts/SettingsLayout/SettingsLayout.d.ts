import { LayoutContainerProps, LayoutDefinition, SettingsProps } from '@icatalyst/react-ui-components';
import { Theme } from '@mui/material';
export type SettingsLayoutDefinitionProps = LayoutDefinition & {
    name: 'settings';
    theme: {
        main: string;
        panel: string;
    };
};
export declare const SettingsLayoutDefaults: SettingsLayoutDefinitionProps;
declare const useStyles: (params: LayoutDefinition<string> & {
    name: 'settings';
    theme: {
        main: string;
        panel: string;
    };
} & {
    mainTheme?: Theme | undefined;
}, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "settingsPanel" | "background_override", string>;
    theme: Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface SettingsLayoutProps extends LayoutContainerProps<SettingsLayoutDefinitionProps, Partial<ReturnType<typeof useStyles>['classes']>> {
    repositoryName: string;
    dataDefinition: string;
    categories: SettingsProps['categories'];
    settingsID: string;
}
export declare function SettingsLayout({ className, style, classes: classesProp, layoutConfig, repositoryName, dataDefinition, categories, settingsID, }: SettingsLayoutProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default SettingsLayout;
