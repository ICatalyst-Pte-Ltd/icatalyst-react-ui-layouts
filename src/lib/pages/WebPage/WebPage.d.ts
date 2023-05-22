import { IFrameSandboxProps } from '@icatalyst/react-ui-components';
import { TitledPageProps } from '../TitledPage';
export interface WebPageProps extends Omit<TitledPageProps, 'children'> {
    src: string;
    sandbox?: IFrameSandboxProps[];
}
export declare function WebPage({ className, style, classes: classesProp, title, src, sandbox, ...rest }: WebPageProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default WebPage;
