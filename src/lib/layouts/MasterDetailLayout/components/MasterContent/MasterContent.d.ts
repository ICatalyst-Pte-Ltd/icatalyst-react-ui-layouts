import { DataRepository, DtoType } from '@icatalyst/js-core';
import { BaseComponent, Model, RepositoryTableProps } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "table" | "grid" | "entityCard", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface MasterContentProps<IDFieldName extends string = 'id', DataType extends DtoType<IDFieldName> = DtoType<IDFieldName>> extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    model: Model;
    repository: DataRepository<IDFieldName, DataType>;
    onItemClick: RepositoryTableProps<IDFieldName, DataType>['onRowClick'];
    onSelectionChange?: RepositoryTableProps<IDFieldName, DataType>['onSelectionChange'];
    onDelete?: (data: DataType) => void;
    contentRef: RepositoryTableProps<IDFieldName, DataType>['tableRef'];
    variant?: 'grid' | 'table';
}
export declare function MasterContent<IDFieldName extends string = 'id', DataType extends DtoType<IDFieldName> = DtoType<IDFieldName>>({ className, style, classes: classesProp, model, repository, onItemClick, onSelectionChange, onDelete, contentRef, variant, }: MasterContentProps<IDFieldName, DataType>): import("@emotion/react/jsx-runtime").JSX.Element;
export default MasterContent;
