import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['MuiLink'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['MuiLink'] = {
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
const createVariants = (_theme: Theme): ComponentsVariants['MuiLink'] => [
  // Use prop matching to set variant styles
  // {
  //   props: {
  //     variant: 'gradient'
  //   },
  //   style: {
  //     fontWeight: 'bold',
  //     //display: 'none',
  //     backgroundColor: 'cyan',
  //     // '& .MuiTypography-root-MuiLink-root': {
  //     //   color: 'cyan'
  //     // },
  //     color: 'cyan',
  //     textDecoration: 'none',
  //     fontSize: 30
  //     // '& .MuiLink-root': {
  //     //   background: 'linear-gradient(90deg, rgba(92,83,167,1) 23%, rgba(249,112,187,1) 100%)'
  //     // }
  //   }
  // },
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
    // Link: {
    //   defaultProps,
    //   styleOverrides
    //   //  variants: createVariants(theme)
    // },
    MuiLink: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
