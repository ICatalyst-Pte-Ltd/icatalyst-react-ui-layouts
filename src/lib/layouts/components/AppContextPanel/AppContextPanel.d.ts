import { ContextPanelProps } from '@icatalyst/react-ui-components';
export type AppContextPanelProps = Omit<ContextPanelProps, 'open' | 'children'>;
export declare function AppContextPanel(props: AppContextPanelProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default AppContextPanel;
