import { Model, SectionHeaderProps } from '@icatalyst/react-ui-components';
import { SyntheticEvent } from 'react';
export interface MasterDetailHeaderProps extends SectionHeaderProps {
    model: Model;
    onAddClick?: () => void;
    onDeleteClick?: (rows: any[]) => void;
    onBackClick?: () => void;
    onSearchChange?: (e: SyntheticEvent, value: string | null) => void;
    isModified?: boolean;
    isDetailHeader?: boolean;
}
export declare function MasterDetailHeader({ className, style, classes: classesProp, title, onAddClick, onDeleteClick, onBackClick, onSearchChange, model, isModified, isDetailHeader, ...rest }: MasterDetailHeaderProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default MasterDetailHeader;
