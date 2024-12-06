import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Section'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Section'] = {
  // Set some static styles
  root: {
    'flexWrap': 'wrap',

    '[class*="Section-introText"]': {
      width: '100%',
      marginBottom: '1rem'
    },

    '[class*="Media-embedRoot"]': {
      minHeight: 368
    },

    '[class*="Section-gridItem"] > img': {
      padding: 8
    }
  }

  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Section'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'default-responsive'
    },
    style: {
      '& [class*="Section-gridContainer"]': {
        [_theme.breakpoints.down('md')]: {
          flexDirection: 'column-reverse'
        }
      }
    }
  },
  {
    props: {
      variant: 'split-panel'
    },
    style: {
      '& [class*="Section-gridContainer"]': {
        alignItems: 'center',

        [_theme.breakpoints.down('md')]: {
          flexDirection: 'column'
        }
      }
    }
  },
  {
    props: {
      variant: 'two-per-row'
    },
    style: {
      '& [class*="Section-gridContainer"]': {
        'display': 'flex',
        'alignItems': 'center',
        '& svg': {
          maxWidth: 350
        },
        '& [class*="Section-gridItem"]': {
          display: 'flex',
          justifyContent: 'end'
        }
      }
    }
  },
  {
    props: {
      variant: 'three-per-row'
    },
    style: {
      '& > [class*="Section-gridContainer"], & div > [class*="Section-gridContainer"]': {
        'display': 'grid',
        'gridTemplateColumns': '1fr',
        [_theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        [_theme.breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(3, 1fr)'
        },
        ' > [class*="Section-gridItem"]': {
          'maxWidth': '100%',
          'height': '100%',
          '& .MuiCard-root': {
            height: '100%'
          },
          '& .MuiCardContent-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'four-per-row'
    },
    style: {
      '& > [class*="Section-gridContainer"], & div > [class*="Section-gridContainer"]': {
        'display': 'grid',
        'gridTemplateColumns': '1fr',
        [_theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        [_theme.breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(4, 1fr)'
        },
        ' > [class*="Section-gridItem"]': {
          'maxWidth': '100%',
          'height': '100%',
          '& .MuiCard-root': {
            height: '100%'
          },
          '& .MuiCardContent-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%'
          }
        }
      }
    }
  },
  {
    props: {
      backgroundColor: 'background.dark'
    },
    style: {
      backgroundColor: _theme.palette.backgroundOption?.dark
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Section: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
