import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Header'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Header'] = {
  root: ({ theme, elevation }) => ({
    padding: theme.spacing(0, 2),
    backgroundColor: !!elevation ? '#1e2145' : 'black',
    backgroundImage: 'unset'
  }),

  contentContainer: ({ theme, menuVisible, isElevated }) => ({
    height: '100%',
    minHeight: theme.spacing(4),
    maxHeight: theme.spacing(11.25),
    alignItems: 'stretch',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gap: theme.spacing(0, 2),
    gridTemplateRows: !!isElevated ? `minmax(${theme.spacing(6.25)}, 1fr)` : `minmax(${theme.spacing(8.375)}, 1fr)`,

    ...(!!menuVisible && {
      maxHeight: '100%'
    }),

    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(3),
      maxHeight: 'unset',
      minHeight: 'unset'
    }
  }),

  logoRoot: ({ theme }) => ({
    gridColumn: '1/7',
    gridRow: 1,
    alignSelf: 'center',

    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / span 2'
    }
  }),

  logo: ({ isElevated }) => ({
    display: 'block',
    height: 40,
    margin: 0,

    svg: {
      fill: '#ffffff'
    }
  }),

  headerMenuNav: ({ theme, menuVisible }) => ({
    justifyItems: 'center',
    justifyContent: 'flex-end',
    position: 'unset',
    gridColumn: '1/-1',
    gridRow: 2,
    height: '100%',
    maxHeight: '100vh',
    overflow: 'auto',

    ...(!menuVisible && {
      maxHeight: 0
    }),

    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),

    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(-5),
      marginRight: theme.spacing(-5)
    },

    [theme.breakpoints.up('lg')]: {
      height: 'auto',
      overflow: 'unset',
      marginLeft: 0,
      marginRight: 0,
      maxHeight: '100%',
      gridColumn: '3 / -3',
      gridRow: 1,
      display: 'inline-flex'
    }
  }),

  headerMenuNavItems: ({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
    position: 'unset',
    flexDirection: 'column',
    width: '100%',
    borderBottom: `solid 1px ${theme.palette.secondary.main}`,

    [theme.breakpoints.up('lg')]: {
      borderBottom: 'none',
      height: '100%',
      flexDirection: 'row',
      width: 'auto'
    }
  }),

  headerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',

    [theme.breakpoints.up('lg')]: {
      height: '100%'
    }
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Header'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Header: {
      // @ts-expect-error
      height: 80,
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
