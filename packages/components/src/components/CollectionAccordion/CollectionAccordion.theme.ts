import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CollectionAccordion'] = {
  root: ({ theme }) => {
    return {
      'backgroundColor': 'transparent',
      'gridGap': theme.spacing(4),
      '.MuiTypography-h2': {
        color: theme.palette.primary.main
      },

      '.MuiGrid-container': {
        gridGap: 2
      },

      '.MuiAccordion-root': {
        'backgroundColor': 'transparent',
        'border': 'solid 1px transparent',
        'borderRightColor': theme.palette.primary.dark,
        'borderBottomColor': theme.palette.primary.dark,
        'borderBottomLeftRadius': 0,
        'borderTopRightRadius': 0,
        '*': {
          color: theme.palette.primary.main
        }

        // '.Mui-expanded': {
        //   backgroundColor: theme.palette.common.white,
        //   borderTopLeftRadius: theme.spacing(2),
        //   borderTopRightRadius: theme.spacing(2)
        // }
      },

      '.MuiCollapse-wrapper': {
        'borderRadius': theme.spacing(1),
        'backgroundColor': theme.palette.common.black,
        '*': {
          color: theme.palette.common.white
        }
      }
    };
  }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['CollectionAccordion'] => [
  // Use prop matching to set variant styles
  // {
  //   props: {
  //     variant: 'example'
  //   },
  //   style: {
  //     backgroundColor: theme.palette.primary.main
  //   }
  // }
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
    CollectionAccordion: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
