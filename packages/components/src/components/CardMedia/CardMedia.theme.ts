import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CardMedia'] = {
  root: ({ theme }) => ({
    'padding': theme.spacing(0),
    'position': 'relative',
    'boxShadow': 'unset',
    'border': 'unset',
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'transform': 'translateZ(0) scale(.9)',
    'borderRadius': 0,
    '& *': {
      color: theme.palette.common.black
    },

    '&:hover': {
      transform: 'scale(1)'
    }
  }),

  cardLink: () => ({
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'zIndex': 10,
    'width': '100%',
    'height': '100%',
    '&:hover': {
      '.MuiCardActionArea-focusHighlight': {
        opacity: 0
      }
    }
  }),

  cardMedia: ({ theme }) => ({
    'display': 'block',
    'position': 'relative',
    'width': '100%',
    'paddingBottom': theme.spacing(2),

    '& > span': {
      width: '100% !important',
      height: '100% !important'
    }
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['CardMedia'] => [
  {
    props: {
      variant: 'mediaFill'
    },
    style: {
      '[class*=cardMedia]': {
        'width': '100%',

        '& > *': {
          objectFit: 'fill',
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  {
    props: {
      variant: 'mediaContained'
    },
    style: {
      '[class*=cardMedia]': {
        '& > *': {
          objectFit: 'contain',
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  {
    props: {
      variant: 'mediaSquare'
    },
    style: {
      '[class*=cardMedia]': {
        'aspectRatio': '1/1',
        'width': '100%',

        '& > *': {
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }
      }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    CardMedia: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
