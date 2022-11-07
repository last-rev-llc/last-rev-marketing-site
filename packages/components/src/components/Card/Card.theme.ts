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
const createVariants = (theme: Theme): ComponentsVariants['Card'] => [
  // Use prop matching to set variant styles

  {
    props: {
      variant: 'icon-centered'
    },
    style: {
      'textAlign': 'center',
      'display': 'flex',
      'flexDirection': 'column',
      '& .MuiTypography-h4': {
        fontSize: '1.1rem'
      },
      '& .MuiCardMedia-root': {
        'display': 'flex',
        'justifyContent': 'center',
        '& img': {
          aspectRatio: '1',
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          minWidth: 200,
          maxWidth: 200
        }
      }
    }
  },
  {
    props: {
      variant: 'dark'
    },
    style: {
      'backgroundColor': 'black',
      'color': 'white',
      'textAlign': 'center',
      'display': 'flex',
      'flexDirection': 'column',
      'transition': 'all 0.3s ease-in-out',
      'box-shadow': '0 0 0 1px hsl(0deg 0% 100% / 15%)',
      '& .MuiTypography-h4': {
        fontSize: '1.1rem'
      },
      '& .MuiCardMedia-root': {
        'display': 'flex',
        'justifyContent': 'center',
        '& img': {
          aspectRatio: '1',
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          minWidth: 200,
          maxWidth: 200
        }
      },
      '&:hover': {
        backgroundColor: '#111111'
      }
    }
  },
  {
    props: {
      variant: 'left-icon-centered-text'
    },
    style: {
      'textAlign': 'center',
      '& .MuiCardMedia-root': {
        'maxHeight': theme.spacing(12),
        'marginBottom': theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          minHeight: theme.spacing(14),
          marginBottom: theme.spacing(4)
        },

        '& img': {
          [theme.breakpoints.down('md')]: {
            aspectRatio: '1'
          }
        },

        '& svg': {
          [theme.breakpoints.down('md')]: {
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
        marginTop: theme.spacing(1),
        padding: theme.spacing(2, 0)
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
        [theme.breakpoints.down('md')]: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        '& img': {
          maxWidth: 64
        }
      },
      '& .MuiTypography-root': {
        [theme.breakpoints.down('md')]: {
          textAlign: 'center'
        }
      }
    }
  },
  {
    props: {
      variant: 'left-align-no-bg'
    },
    style: {
      'color': theme.palette.text.primary,
      'display': 'flex',
      '& .MuiTypography-h4': {
        fontSize: '1.1rem'
      },

      '& .MuiCardContent-root': {
        height: 'auto',
        justifyContent: 'center'
      },

      '& .MuiCardMedia-root': {
        'display': 'flex',
        'justifyContent': 'center',
        'width': 'max-content',
        'height': 'auto',

        [theme.breakpoints.down('md')]: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        '& img': {
          paddingLeft: 20,
          paddingRight: 20,
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          minWidth: 250,
          maxWidth: 250,
          aspectRatio: '1'
        }
      },
      '& .MuiTypography-root': {
        [theme.breakpoints.down('md')]: {
          textAlign: 'center'
        }
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
