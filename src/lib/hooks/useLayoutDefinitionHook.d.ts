import { LayoutDefinition } from '@icatalyst/react-ui-components';
/**
 * The useLayoutDefinition hook makes it easier to manage the layout configuration by
 * managing and resolving any user defined overrides for a specific layout
 * @param defaults the default settings for the layout.  Any user overrides are merged with this
 * @returns the resolved layout and a function to set overrides for the user
 */
export declare function useLayoutDefinition<LayoutConfig extends LayoutDefinition>(defaults: LayoutConfig): [LayoutConfig, (overrides: Partial<LayoutConfig>) => void];
