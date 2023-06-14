import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Text'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Text'] = {
  // Set some static styles
  root: {
    '& > *:not(:first-child)': {
      '&:not(:is(ul, ol, li))': {
        marginTop: '1em',
        marginBottom: '.5em',
        padding: 0
      },

      '&:is(ul, ol)': {
        'marginTop': '1em',
        'marginBottom': '2em',

        'li *': {
          fontSize: 'inherit'
        },

        'li': {
          fontSize: '.9em',
          fontFamily: 'inherit'
        }
      }
    },

    // '& > a': {
    //   display: 'contents'
    // },

    '& > *:first-child': {
      marginTop: '0'
    },

    '& > [class*=MuiTypography-h]': {
      marginBottom: '.5em',
      marginTop: '2em'
    }

    // 'ol, ul, li': {
    //   /* Revert padding reset is what gives the indentation to list */

    //   padding: 'revert'
    // },
    // 'h2': {
    //   // paddingTop: 16,
    //   paddingBottom: 16
    // },
    // 'h3': { paddingBottom: 16 },
    // 'h4': { paddingBottom: 16 },
    // 'p': { paddingBottom: 16 }
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
const createVariants = (_theme: Theme): ComponentsVariants['Text'] => [
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
  {
    props: { variant: 'blog' },
    style: {
      'ol, ul, li': { padding: 'revert' },
      'h1': { paddingTop: 16, paddingBottom: 16 },
      'h2': { paddingTop: 16, paddingBottom: 16 },
      'p': { paddingBottom: 16 }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Text: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
