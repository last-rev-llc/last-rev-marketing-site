import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['GlobalFooter'] = {
  root: ({ theme }) => ({
    '& a': {
      textDecoration: 'none'
    },

    'backgroundColor': theme.palette.common.black,

    '& .MuiGrid-container': {
      'paddingTop': theme.spacing(2),
      '& .MuiGrid-root': {
        display: 'flex',
        alignSelf: 'flex-start'
      }
    },

    '& [class*="Media-root"]': {
      padding: '40px 0px',
      display: 'flex',
      maxWidth: '150px'
    },

    '[data-csk-entry-type="navigationItem"]': {
      [theme.breakpoints.down('md')]: {
        color: 'white',
        textAlign: 'center'
      }
    }
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['GlobalFooter'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    GlobalFooter: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
