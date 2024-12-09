import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { SectionProps } from './Section.types';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Section'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Section'] = {
  // Set some static styles
  root: ({ theme, ownerState = {} }: { theme: Theme; ownerState?: SectionProps }) => ({}),

  gridContainer: ({ theme, ownerState = {} }: { theme: Theme; ownerState?: SectionProps }) => ({
    maxWidth: '100%',
    display: 'grid',
    gap: theme.spacing(ownerState?.contentSpacing || 0),
    flexDirection: ownerState?.contentDirection || 'row'
  })

  // gridItem: {
  //   gridColumn: '-1/1'
  // }

  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme, ownerState: any): ComponentsVariants['Section'] => [
  {
    props: {},
    style: {
      'position': 'relative',
      'overflow': 'hidden',

      '[class*="Section-introTextWrapper"]': {
        width: '100%',
        marginBottom: '1rem'
      },

      'paddingLeft': ownerState?.styles?.root?.paddingLeft || theme.spacing(0),
      'paddingRight': ownerState?.styles?.root?.paddingRight || theme.spacing(0),
      'paddingTop': ownerState?.styles?.root?.paddingTop || theme.spacing(0),
      'paddingBottom': ownerState?.styles?.root?.paddingBottom || theme.spacing(0),

      [theme.breakpoints.up('sm')]: {
        paddingLeft: ownerState?.styles?.root?.paddingLeft || theme.spacing(0),
        paddingRight: ownerState?.styles?.root?.paddingRight || theme.spacing(0),
        paddingTop: ownerState?.styles?.root?.paddingTop || theme.spacing(0),
        paddingBottom: ownerState?.styles?.root?.paddingBottom || theme.spacing(0)
      },

      [theme.breakpoints.up('xl')]: {
        paddingTop: ownerState?.styles?.root?.paddingTop || theme.spacing(0),
        paddingBottom: ownerState?.styles?.root?.paddingBottom || theme.spacing(0)
      },

      '&.section-baseline': {
        paddingLeft: ownerState?.styles?.root?.paddingLeft || theme.spacing(2),
        paddingRight: ownerState?.styles?.root?.paddingRight || theme.spacing(2),
        paddingTop: ownerState?.styles?.root?.paddingTop || theme.spacing(4),
        paddingBottom: ownerState?.styles?.root?.paddingBottom || theme.spacing(4),

        [theme.breakpoints.up('sm')]: {
          paddingLeft: ownerState?.styles?.root?.paddingLeft || theme.spacing(3),
          paddingRight: ownerState?.styles?.root?.paddingRight || theme.spacing(3),
          paddingTop: ownerState?.styles?.root?.paddingTop || theme.spacing(6),
          paddingBottom: ownerState?.styles?.root?.paddingBottom || theme.spacing(6)
        },

        [theme.breakpoints.up('xl')]: {
          paddingTop: ownerState?.styles?.root?.paddingTop || theme.spacing(10),
          paddingBottom: ownerState?.styles?.root?.paddingBottom || theme.spacing(10)
        }
      }
    }
  },
  {
    props: { variant: 'default-responsive' },
    style: {
      '& [class*="Section-gridContainer"]': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))'
      }
    }
  },
  {
    props: { variant: 'default' },
    style: {
      '& [class*="Section-gridContainer"]': {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
      }
    }
  },
  {
    props: { variant: 'one-per-row' },
    style: {
      '& [class*="Section-gridContainer"]': {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
      }
    }
  },
  {
    props: { variant: 'split-panel' },
    style: {
      '& [class*="Section-gridContainer"]': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        }
      }
    }
  },
  {
    props: { variant: 'two-per-row' },
    style: {
      '& [class*="Section-gridContainer"]': {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        }
      }
    }
  },
  {
    props: { variant: 'three-per-row' },
    style: {
      '& [class*="Section-gridContainer"]': {
        'gridTemplateColumns': 'repeat(1, minmax(0, 1fr))',
        [theme.breakpoints.up('sm')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        },
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
        },
        '& [class*="Section-gridItem"]': {
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
    props: { variant: 'four-per-row' },
    style: {
      '& [class*="Section-gridContainer"]': {
        'display': 'grid',
        'gridTemplateColumns': 'repeat(1, minmax(0, 1fr))',
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        },
        [theme.breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
        },
        '& [class*="Section-gridItem"]': {
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
    props: { backgroundColor: 'background.dark' },
    style: {
      backgroundColor: theme.palette.backgroundOption?.dark
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
