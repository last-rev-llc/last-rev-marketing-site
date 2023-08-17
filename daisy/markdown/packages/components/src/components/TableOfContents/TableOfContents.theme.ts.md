import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['TableOfContents'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['TableOfContents'] = {
  // Set some static styles
  root: {
    'ol, ul, li': {
      // no bullet points
      listStyle: 'none'
    },
    // make links same color as text and not colored diffrenty when visited
    'a': {
      'color': 'inherit',
      'textDecoration': 'none',
      '&:visited': {
        color: 'inherit'
      }
    }
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
const createVariants = (_theme: Theme): ComponentsVariants['TableOfContents'] => [
  // Use prop matching to set variant styles
  // {
  //   props: {
  //     variant: 'example'
  //   },
  //   style: {
  //     backgroundColor: theme.palette.primary.main
  //   }
  // }
  // Other props are also valid
  // {
  //   props: {
  //     backgroundColor: 'primary.main',
  //   },
  //   style: {
  //     color: theme.palette.primary.contrastText
  //   }
  // }
  // {
  //   props: { variant: 'blog' },
  //   style: {
  //     'ol, ul, li': { padding: 'revert' },
  //     'h1': { paddingTop: 16, paddingBottom: 16 },
  //     'h2': { paddingTop: 16, paddingBottom: 16 },
  //     'p': { paddingBottom: 16 }
  //   }
  // }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    TableOfContents: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
