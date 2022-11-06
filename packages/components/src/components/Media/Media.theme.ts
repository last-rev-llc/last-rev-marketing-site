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
  },
  embedRoot: {
    minHeight: 400
  }

  // root: {
  //   backgroundColor: 'red'
  // }
  //
  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
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
  // Other props are also valid
  // {
  //   props: {
  //     backgroundColor: 'primary.main',
  //   },
  //   style: {
  //     color: theme.palette.primary.contrastText
  //   }
  // }
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
