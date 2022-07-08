import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
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
const createVariants = (_theme: Theme): ComponentsVariants['Collection'] => [
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
          maxWidth: '100%',
          height: '100%'
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
          maxWidth: '100%',
          height: '100%'
        }
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
    Collection: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
