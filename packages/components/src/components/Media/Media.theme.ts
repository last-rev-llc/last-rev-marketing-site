import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Media'] = {
  nextImageOptimization: true,
  disableInlineSVG: true,
  priority: false,
  // All images are shown close to full bleed size
  sizes: '100vw'
};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Media'] = {
  // Set some static styles
  root: {
    // img default display: inline introduces a line-height space at the bottom
    display: 'block',
    maxWidth: `100%`,
    margin: 'auto',
    height: 'auto'
  }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Media'] => [
  {
    props: {
      variant: 'embed'
    },
    style: {
      minHeight: 400
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Media: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
