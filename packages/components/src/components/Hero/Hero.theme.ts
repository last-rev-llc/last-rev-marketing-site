import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Hero'] = {
  contentWidth: 'xl',
  disableGutters: false
};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  // Set some static styles
  root: ({ theme }) => {
    return {
      'minHeight': 'initial',
      'paddingTop': '0 !important',
      'paddingBottom': '0 !important',

      'h1': {
        paddingBottom: theme.spacing(2)
      },

      '& [class*="Hero-contentContainer"]': {
        'paddingTop': '0',
        'marginTop': '-6rem',
        'paddingBottom': '5vh',
        'backgroundColor': 'rgba(0, 0, 0, .25)',

        [theme.breakpoints.up('md')]: {
          marginTop: '0',
          backgroundColor: 'transparent',
          paddingTop: '20vh',
          paddingBottom: '20vh'
        },

        '& .MuiGrid-container': {
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
            textAlign: 'center'
          }
        }
      }
    };
  },
  mediaRoot: () => {
    return {
      width: '100%'
    };
  }
  //
  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'default'
    },
    style: {
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
      },

      '[class*="Hero-backgroundRoot"] ': {
        [theme.breakpoints.down('md')]: {
          position: 'relative'
        },

        [theme.breakpoints.up('md')]: {
          '& img ': {
            height: '100%',
            width: 'initial',
            maxWidth: 'initial',
            position: 'absolute',
            right: 0,
            top: 0
          }
        }
      }
    }
  },
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
        maxWidth: 450,
        [theme.breakpoints.down('md')]: {
          margin: 'auto',
          maxWidth: 300
        }
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0)
      }
    }
  }

  //to do: figure out how to make this prop work
  // {
  //   props: {
  //     backgroundColor: 'black'
  //   },
  //   style: {
  //     'display': 'none',
  //     'backgroundColor': 'cyan',
  //     '& .MuiGrid-item:nth-child(2)': {
  //       backgroundColor: 'cyan',
  //       color: _theme.palette.primary.contrastText
  //     }
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
