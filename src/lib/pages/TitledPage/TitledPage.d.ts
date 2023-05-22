import { ComponentColor, ComponentSize, IconButtonProps, PageProps, SectionHeaderProps } from '@icatalyst/react-ui-components';
import { ReactNode } from 'react';
export interface TitledPageProps extends PageProps {
    title: string;
    headerSize?: ComponentSize;
    actions?: (IconButtonProps | ReactNode)[];
    titleVariant?: SectionHeaderProps['variant'];
    icon?: string;
    iconColor?: ComponentColor;
    iconTitle?: string;
    showDivider?: boolean;
    onIconClick?: () => void;
}
export declare function TitledPage({ className, style, classes: classesProp, children, renderNavigation, headerSize, title, actions, titleVariant, icon, iconColor, iconTitle, onIconClick, showDivider, ...rest }: TitledPageProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default TitledPage;
