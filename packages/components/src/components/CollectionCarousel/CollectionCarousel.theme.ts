import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CollectionCarousel'] = {
  root: () => ({}),
  contentContainer: ({ theme }) => ({
    'display': 'grid',
    'gridTemplateColumns': 'repeat(2,1fr)',
    'gap': theme.spacing(2, 2),

    'section[id] &': {
      padding: 0
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(6,1fr)',
      gap: theme.spacing(8, 3)
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: theme.spacing(8, 3)
    }
  }),

  carouselContainer: ({ theme }) => ({
    gridColumn: '1 / span 2',
    display: 'grid',
    gap: theme.spacing(3, 3),

    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / span 6'
    },

    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / span 12'
    }
  }),

  introText: ({ theme, align }) => ({
    'gridColumn': '1 / span 2',
    'position': 'relative',

    'marginBottom': theme.spacing(4),

    '[class$=Text-title]': {
      ...theme.typography.h4,
      textAlign: `${align === 'center' ? 'center' : 'left'}`
    },

    '[class$=Text-subtitle]': {
      ...theme.typography.h5,
      textAlign: `${align === 'center' ? 'center' : 'left'}`,
      marginTop: theme.spacing(2)
    },

    '[class$=Text-root]': {
      marginTop: theme.spacing(3),
      textAlign: `${align === 'center' ? 'center' : 'left'}`
    },

    [theme.breakpoints.up('md')]: {
      'gridColumn': '1 / span 5',

      ...(align === 'center' && {
        gridColumn: '1 / -1'
      }),

      '[class$=Text-title]': {
        ...theme.typography.h3
      },

      '[class$=Text-root] > *': {
        ...theme.typography.body2
      }
    },

    '& + [class*=contentContainer]': {
      marginTop: theme.spacing(4)
    }
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['CollectionCarousel'] => [
  {
    props: {
      variant: 'carouselOnePerRow'
    },
    style: {
      '&': {
        '[class*="CollectionCarousel-carouselContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
        }
      }
    }
  },
  {
    props: {
      variant: 'carouselTwoPerRow'
    },
    style: {
      '&': {
        '[class*="CollectionCarousel-carouselContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'carouselThreePerRow'
    },
    style: {
      '&': {
        '[class*="CollectionCarousel-carouselContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'carouselFourPerRow'
    },
    style: {
      '&': {
        '[class*="CollectionCarousel-carouselContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
          }
        }
      }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    CollectionCarousel: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
