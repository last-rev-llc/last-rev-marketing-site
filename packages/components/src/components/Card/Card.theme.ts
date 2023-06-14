import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme }) => {
    return {
      '&': {
        'width': '100%',
        'position': 'relative',
        'boxShadow': `0 0 0 1px ${theme.palette.secondary.main}, 0 0 0 1px ${theme.palette.secondary.main}`,
        'border': `solid 1px transparent`,
        'backgroundColor': theme.palette.text.secondary,
        'transition': 'all 0.25s ease-in-out',
        'willChange': 'transform',
        'transform': 'translateZ(0)',

        '&:hover': {
          'transform': 'scale(1.05)',
          'backgroundColor': 'transparent',
          'border': `solid 1px ${theme.palette.text.secondary}`,

          '& .MuiCardMedia-root > *': {
            transform: 'scale(1.25)'
          }
        },

        '& .MuiTypography-h3': {
          ...theme.typography.h1,
          paddingBottom: theme.spacing(2)
        },

        '& .MuiCardMedia-root': {
          'overflow': 'hidden',
          'position': 'relative',

          '& > *': {
            transition: 'all 0.25s ease-in-out',
            willChange: 'transform',
            transform: 'translateZ(0)',
            width: '100%',
            maxWidth: '100%',
            objectFit: 'cover'
          }
        },

        '& .MuiCard-root': {
          height: '100%'
        },

        '& .MuiCardContent-root': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '100%'
        },

        '& .MuiCardActions-root': {
          'marginTop': 'auto',
          'display': 'flex',
          'flexDirection': 'column',
          'alignItems': 'flex-start',

          '& *': {
            ...theme.typography.body3,
            marginLeft: 0
          }
        }
      }
    };
  }
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
      'padding': 24,
      'backgroundColor': 'black',
      'color': 'white',
      'textAlign': 'center',
      'display': 'flex',
      'flexDirection': 'column',
      'transition': 'all 0.3s ease-in-out',
      'box-shadow': '0 0 0 1px hsl(0deg 0% 100% / 15%)',
      '& .MuiTypography-h3': {
        fontSize: '1.5rem',
        paddingBottom: 16
      },
      '& .MuiTypography-h4': {
        fontSize: '1.1rem',
        paddingBottom: 16
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
        // 'maxHeight': theme.spacing(12),
        'border': 'solid 10px blue !important',
        'marginBottom': theme.spacing(2),

        [theme.breakpoints.up('sm')]: {
          minHeight: theme.spacing(14),
          marginBottom: theme.spacing(4)
        },

        '& > *': {
          aspectRatio: '1/1'
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
        '& > *': {
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
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
      },

      'color': theme.palette.text.primary,
      'display': 'flex',

      '& .MuiCardContent-root': {
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
      },

      '& .MuiCardMedia-root': {
        'display': 'flex',
        'justifyContent': 'center',
        'aspectRatio': '1/1',
        'maxWidth': '20%',

        [theme.breakpoints.down('md')]: {
          justifyContent: 'center',
          textAlign: 'center'
        },

        '& > *': {
          width: '100%',
          height: '100%',
          objectFit: 'contain'
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
