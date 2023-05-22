import { SnackbarProps } from '@icatalyst/react-ui-components';
export type AppSnackbarProps = Omit<SnackbarProps, 'open' | 'children'>;
export declare function AppSnackbar(props: AppSnackbarProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default AppSnackbar;
