import { AuthRole, BaseComponent } from '@icatalyst/react-ui-components';
import { Theme } from '@mui/material';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "userRoles" | "hideUserRoles" | "displayName" | "hideDisplayName" | "avatarWrapper" | "avatarWrapperProfilePath" | "avatarWrapperMinimal" | "avatar" | "avatarMinimal" | "avatarSize" | "avatarSizeMinimal" | "avatarFontSize" | "avatarFontSizeMinimal" | "editBadge" | "editBadgeIcon", string>;
    theme: Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface AppUserInfoProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    minimal?: boolean;
    displayName: string;
    profileImage: string;
    roles: AuthRole[];
    profilePath?: string;
}
export declare function AppUserInfo({ className, style, classes: classesProp, minimal, displayName, profileImage, roles, profilePath, }: AppUserInfoProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default AppUserInfo;
