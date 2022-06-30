import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
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
const createVariants = (_theme: Theme): ComponentsVariants['Card'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'icon-centered'
    },
    style: {
      'textAlign': 'center',
      '& .MuiCardMedia-root': {
        'maxHeight': _theme.spacing(12),
        'marginBottom': _theme.spacing(2),
        [_theme.breakpoints.up('sm')]: {
          minHeight: _theme.spacing(14),
          marginBottom: _theme.spacing(4)
        },

        '& img': {
          [_theme.breakpoints.down('md')]: {
            aspectRatio: '1'
          }
        },

        '& svg': {
          [_theme.breakpoints.down('md')]: {
            aspectRatio: '1'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'blog-featured'
    },
    style: {
      'boxShadow': '0px 0px 0px 0px',
      'borderRadius': 0,

      '& .MuiCardMedia-root': {
        '& img': {
          aspectRatio: '16/9'
        },
        '& svg': {
          aspectRatio: '16/9'
        }
      },
      '& .MuiCardActions-root': {
        marginTop: _theme.spacing(1),
        padding: _theme.spacing(2, 0)
      }
    }
  },
  {
    props: {
      variant: 'left-align'
    },
    style: {
      'borderRadius': 0,
      'backgroundColor': 'black',
      'color': 'white',
      '& .MuiCardMedia-root': {
        'display': 'flex',
        'justifyContent': 'start',
        [_theme.breakpoints.down('md')]: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        '& img': {
          maxWidth: 64
        }
      },
      '& .MuiTypography-root': {
        [_theme.breakpoints.down('md')]: {
          textAlign: 'center'
        }
      },
      '& .MuiTypography-h3': {
        fontSize: 28,
        fontWeight: 500
      },
      '& .MuiTypography-body': {
        fontSize: 16
      }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Card: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
