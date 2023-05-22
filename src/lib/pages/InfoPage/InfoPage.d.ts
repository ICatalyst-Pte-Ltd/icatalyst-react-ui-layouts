import { ComponentColor, PageProps } from '@icatalyst/react-ui-components';
import { ReactNode } from 'react';
export interface InfoPageProps extends Omit<PageProps, 'children'> {
    title: string;
    /**
     * Can be the string for the icon to display or a component to render
     */
    icon?: ReactNode;
    /**
     * Can be the string for the excerpt box or a component to render
     */
    excerpt?: ReactNode;
    /**
     * Can be the string for the content box or a component to render
     */
    content?: ReactNode;
    iconColor?: ComponentColor;
    children?: ReactNode;
}
export declare const InfoPage: import("react").ForwardRefExoticComponent<Omit<InfoPageProps, "ref"> & import("react").RefAttributes<unknown>>;
export default InfoPage;
