import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Hero'] = {
  contentWidth: 'xl',
  disableGutters: false
};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
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
const createVariants = (_theme: Theme): ComponentsVariants['Hero'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'centered'
    },
    style: {
      '& .MuiGrid-container': {
        'justifyContent': 'center',

        '& > .MuiGrid-item': {
          margin: '0 auto'
        }
      },

      '& .MuiTypography-root': {
        textAlign: 'center'
      },

      '& [class*="Hero-actionsRoot"]': {
        justifyContent: 'center'
      }
    }
  },
  {
    props: {
      variant: 'featured-image'
    },
    style: {
      '& .MuiGrid-item:nth-child(2)': {
        display: 'flex',
        justifyContent: 'flex-end'
      },
      '& img': {
        maxWidth: 600
      },
      [_theme.breakpoints.up('md')]: {
        padding: _theme.spacing(8, 0)
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
    Hero: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
