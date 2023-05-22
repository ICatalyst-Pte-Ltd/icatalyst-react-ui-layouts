import { DataRepository, DtoType } from '@icatalyst/js-core';
import { BaseComponent, EntityViewFormProps, Model } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "root_padded" | "form" | "formHeader" | "formEntityView" | "formActions", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface DetailContentProps<IDFieldName extends string = 'id', DataType extends DtoType<IDFieldName> = DtoType<IDFieldName>> extends Omit<BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>>, 'onSubmit'> {
    model: Model;
    repository: DataRepository<IDFieldName, DataType>;
    isNew?: boolean;
    onSubmit: (data: DataType, callback?: (err?: unknown) => void) => void;
    onChange?: EntityViewFormProps['onChange'];
    onCancel?: EntityViewFormProps['onCancel'];
}
export declare function DetailContent<IDFieldName extends string = 'id', DataType extends DtoType<IDFieldName> = DtoType<IDFieldName>>({ className, style, classes: classesProp, model, repository, onChange, onCancel, onSubmit, isNew, }: DetailContentProps<IDFieldName, DataType>): import("@emotion/react/jsx-runtime").JSX.Element;
export default DetailContent;
