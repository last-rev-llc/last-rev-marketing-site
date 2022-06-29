import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Link'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  // Set some static styles
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
const createMuiLinkVariants = (_theme: Theme): ComponentsVariants['MuiLink'] => [
  // Use prop matching to set variant styles
  {
    props: {
      // TODO: Enable variants on Link component
      // @ts-ignore
      variant: 'gradient'
    },
    style: {
      'fontWeight': 'bold',
      'padding': '10px 30px',
      'borderRadius': '30px',
      'textDecoration': 'none',
      'fontSize': 18,
      'background': 'linear-gradient(90deg, rgba(92,83,167,1) 23%, rgba(249,112,187,1) 100%)',
      '&:hover': {
        background: 'linear-gradient(90deg, rgba(141, 128, 217, 1) 23%, rgb(255, 163, 237,1) 100%)'
      }
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
    Link: {
      defaultProps,
      styleOverrides
    },
    MuiLink: {
      variants: createMuiLinkVariants(theme)
    }
  }
});
