import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme }) => ({
    'padding': theme.spacing(0),
    'position': 'relative',
    'boxShadow': `0 0 0 1px ${theme.palette.primary.light}, 0 0 0 1px transparent`,
    'border': `solid 3px transparent`,
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'transform': 'translateZ(0)',
    'backgroundColor': theme.palette.common.white,
    '& *': {
      color: theme.palette.common.black
    },

    '&:hover': {
      transform: 'scale(1.05)',
      border: `solid 3px ${theme.palette.primary.light}`,
      backgroundColor: theme.palette.backgroundOption?.light
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

  cardMedia: ({ theme, ownerState }) => ({
    'display': 'block',
    'position': 'relative',
    'width': '100%',
    'paddingBottom': theme.spacing(2),

    '& > span': {
      width: '100% !important',
      height: '100% !important'
    },

    ...(ownerState?.variant === 'icon' && {
      padding: theme.spacing(0),
      maxWidth: 48,

      [theme.breakpoints.up('lg')]: {
        'padding': theme.spacing(1),
        'maxWidth': 64,
        '& > img': {
          objectFit: 'contain'
        }
      }
    })
  }),

  cardActions: ({ theme }) => ({
    'padding': 0,
    'marginTop': theme.spacing(1),
    'flexDirection': 'column',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },

    '& a': {
      textDecoration: 'none !important',
      marginLeft: '0 !important'
    }
  }),

  cardAction: () => ({
    paddingLeft: 0,
    marginLeft: 0
  }),

  cardContent: ({ theme, ownerState }) => ({
    ...(ownerState?.variant === 'icon' && {
      '&:last-child': {
        padding: theme.spacing(0)
      }
    })
  }),

  eyebrow: ({ theme }) => ({
    ...theme.typography.bodyXSmall,
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
    color: theme.palette.grey[500]
  }),

  title: ({ theme }) => ({
    ...theme.typography.h6
  }),

  subtitle: () => ({}),

  body: ({ theme, ownerState }) => ({
    'overflow': 'hidden',
    'overflowWrap': 'break-word',
    'textOverflow': 'ellipsis',
    'display': '-webkit-box',
    'hyphens': 'auto',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',

    '& *': {
      ...theme.typography.bodySmall
    },

    ...(ownerState?.variant === 'icon' && {
      marginTop: theme.spacing(1)
    })
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['Card'] => [
  {
    props: {
      variant: 'default'
    },
    style: {
      'display': 'flex',
      'flexDirection': 'column',
      'height': '100%',

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(1)
      },

      [theme.breakpoints.up('lg')]: {
        flexDirection: 'column',
        gap: 0,
        alignItems: 'normal'
      },

      '[class$=Card-cardMedia]': {
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'padding': 0,

        '[class$=Media-root]': {
          margin: 0,
          objectFit: 'cover',
          aspectRatio: '16 / 9'
        },

        [theme.breakpoints.up('md')]: {
          flex: '2 1 0px',
          width: 0
        },

        [theme.breakpoints.up('lg')]: {
          flex: 'unset',
          width: 'unset'
        }
      },

      '[class$=Card-title]': {
        marginBottom: theme.spacing(1)
      },

      '[class$=Card-cardContent]': {
        'padding': theme.spacing(2),

        '&:last-child': {
          // padding: theme.spacing(1),
          zIndex: 100,

          [theme.breakpoints.up('md')]: {
            flex: '3 1 0px',
            width: 0
          },

          [theme.breakpoints.up('lg')]: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: 'unset'
          }
        }
      },

      '[class$=Card-body]': {
        flex: 1
      },

      '[class$=Card-cardActions]': {
        padding: 0,
        marginTop: theme.spacing(8),
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: theme.spacing(1, 4),

        [theme.breakpoints.up('md')]: {
          flexDirection: 'column'
        }
      },

      '[class$=CategoryTag-root]': {
        overflow: 'hidden'
      },

      '[class$=Card-cardAction]': {
        ...theme.typography.bodyXSmall,
        paddingRight: 0,
        whiteSpace: 'nowrap',
        justifyContent: 'flex-end',
        marginLeft: 'auto'
      }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Card: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
