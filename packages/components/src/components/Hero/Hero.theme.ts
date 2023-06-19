import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Hero'] = {
  contentWidth: 'xl',
  disableGutters: false
};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  // Set some static styles
  root: ({ theme, backgroundColor }: { theme: Theme; backgroundColor?: string }) => {
    let bgValue;
    if (backgroundColor) {
      const [colorKey, shadeKey] = backgroundColor.split('.');

      bgValue = theme.palette?.[colorKey]?.[shadeKey];
    }
    return {
      'minHeight': 'unset',

      '&&': {
        paddingTop: '10vh',
        paddingBottom: '10vh',
        background: bgValue
          ? `radial-gradient(circle at top left, ${theme.palette.common.white}, ${bgValue}, ${bgValue})`
          : 'transparent'
      },

      'h1': {
        marginBottom: theme.spacing(2)
      }
    };
  },

  contentContainer: ({ theme }) => {
    return {
      '& > .MuiGrid-container': {
        alignItems: 'center'
      },

      '& [class*="Hero-actionsRoot"]': {
        '& a': {
          textDecoration: 'none'
        },

        [theme.breakpoints.down('md')]: {
          'maxWidth': 200,
          'margin': 'auto',
          'flexDirection': 'column',

          '& :nth-child(n)': {
            marginBottom: theme.spacing(2)
          },

          '& :last-child': {
            marginBottom: theme.spacing(0)
          }
        }
      }
    };
  },

  mediaRoot: ({ theme }) => {
    return {
      'width': '100%',
      'maxWidth': '50%',
      'margin': '0 auto',

      '&&': {
        paddingLeft: 0
      },

      'img': {
        'transition': 'all 0.5s ease-in-out',
        'willChange': 'transform',
        'transform': 'translateZ(0)',
        'borderRadius': theme.spacing(2),

        '&:hover': {
          borderRadius: theme.spacing(4),
          transform: 'scale(1.05)'
        }
      },

      [theme.breakpoints.up('md')]: {
        paddingLeft: 0,
        paddingTop: 0,
        maxWidth: 'unset',
        maxHeight: '80%',
        height: '100%',
        width: 'auto',
        margin: 'unset',

        img: {
          'borderRadius': theme.spacing(4),
          'height': 'auto',
          'maxHeight': '100%',
          'width': 'auto',
          'maxWidth': '100%',

          '&:hover': {
            borderRadius: theme.spacing(8)
          }
        }
      }
    };
  }
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
      }
    }
  }
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
