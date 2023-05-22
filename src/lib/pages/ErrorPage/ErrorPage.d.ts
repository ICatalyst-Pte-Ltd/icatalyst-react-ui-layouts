import { ComponentColor } from '@icatalyst/react-ui-components';
import { InfoPageProps } from '../InfoPage/InfoPage';
export interface ErrorPageProps extends InfoPageProps {
    title: string;
    message?: string;
    linkPath?: string;
    linkText?: string;
    icon?: string;
    iconColor?: ComponentColor;
}
export declare function ErrorPage({ className, style, classes: classesProp, children, title, message, linkPath, linkText, icon, iconColor, ...rest }: ErrorPageProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default ErrorPage;
