import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['PageBlog'] = {
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
const createVariants = (theme: Theme): ComponentsVariants['PageBlog'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'text-image'
    },
    style: {
      '[class*="PageBlog-blogHero"]': {
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '50px 0px 50px 0px',
          [theme.breakpoints.up('xxl')]: {
            margin: '70px 0px 70px 0px'
          }
        }
      },
      '[class*="PageBlog-blogInfo"]': {
        marginRight: 50,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%'
      },
      '[class*="PageBlog-mediaWrap"]': {
        'width': '100%',
        '& img': {
          'width': '100%',
          'height': 'auto',
          'max-width': '60vh',
          'objectFit': 'contain',
          [theme.breakpoints.up('xxl')]: {
            'max-width': '45vh'
          }
        }
      },
      '[class*="PageBlog-BlogTitle"]': {
        [theme.breakpoints.up('md')]: {
          maxWidth: '400px'
        }
      },
      '[class*="PageBlog-authorTypography"]': {
        fontWeight: 'bold'
      },
      '[class*="PageBlog-bodyText"]': {
        '& .MuiTypography-body1': {
          fontSize: '18px'
        },
        [theme.breakpoints.up('xxl')]: {
          '& .MuiTypography-body1': {
            fontSize: '22px'
          }
        }
      }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    PageBlog: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
