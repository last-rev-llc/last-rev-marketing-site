import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CollectionFiltered'] = {
  // Set some static styles
  root: () => {
    return {
      // '[class*=CollectionFiltered-contentContainer]': {
      //   padding: '0 !important'
      // }
      // Temporarily hiding the "All search results" display and "Clear filters" button
      '& [data-testid="CollectionFiltered-ResultsDisplay"]': {
        display: 'none' // Hides the results display
      },
      '& [data-testid="CollectionFilters-clear"]': {
        display: 'none' // Hides the clear filters button
      }
    };
  }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['CollectionFiltered'] => [
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
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    CollectionFiltered: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
