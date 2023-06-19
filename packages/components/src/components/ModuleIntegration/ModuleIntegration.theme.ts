import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['ModuleIntegration'] = {
  root: ({}) => ({})
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['ModuleIntegration'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    ModuleIntegration: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
