import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CollectionCarousel'] = {
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
const createVariants = (): ComponentsVariants['CollectionCarousel'] => [
  {
    props: {
      variant: 'carousel'
    },
    style: {
      '& [class*="CollectionCarousel-carouselItem"]': {
        '& .MuiPaper-root': {
          boxShadow: 'none'
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
      variants: createVariants()
    }
  }
});
