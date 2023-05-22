/// <reference types="react" />
import { ContextPanelProps, RouteDefinition, TitleBarProps } from '@icatalyst/react-ui-components';
export type AppNavbarProps<HeaderProps = any> = Omit<ContextPanelProps, 'open' | 'variant'> & {
    folded: boolean;
    variant?: 'panel' | 'inline';
    TitleBarProps?: TitleBarProps;
    showTitleBar?: boolean;
    HeaderComponent?: React.JSXElementConstructor<HeaderProps>;
    HeaderComponentProps?: HeaderProps;
    routes: RouteDefinition[];
    orientation?: 'horzontal' | 'vertical';
    itemVariant?: 'rounded' | 'square';
    navbarItemActiveBorder?: boolean;
    maxDepth?: number;
};
export declare const AppNavbar: import("react").ForwardRefExoticComponent<Omit<AppNavbarProps<any>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default AppNavbar;
