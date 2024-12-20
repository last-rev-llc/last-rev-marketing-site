import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CollectionCarousel1'] = {
  // Set some static styles
  root: {
    maxWidth: '100vw !important'
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
const createVariants = (_theme: Theme): ComponentsVariants['CollectionCarousel1'] => [
  {
    props: {
      variant: 'carousel'
    },
    style: {
      'overflow': 'hidden',

      '& [class*="CollectionCarousel-carouselItem"]': {
        '& .MuiPaper-root': {
          boxShadow: 'none',
          borderRadius: 0,
          [_theme.breakpoints.down('md')]: {
            padding: '0px 32px 40px 32px'
          },
          [_theme.breakpoints.down('sm')]: {
            padding: '0px'
          }
        }
      }
    }
  }
];

export default (_theme: any): ThemeOptions => ({
  components: {
    CollectionCarousel: {
      defaultProps,
      styleOverrides,
      variants: createVariants(_theme)
    }
  }
});
