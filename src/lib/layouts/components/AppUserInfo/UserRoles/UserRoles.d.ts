import { AuthRole, BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "roleList" | "roleItem", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface UserRolesProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    roles: AuthRole[];
}
export declare function UserRoles({ className, style, classes: classesProp, roles, }: UserRolesProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default UserRoles;
