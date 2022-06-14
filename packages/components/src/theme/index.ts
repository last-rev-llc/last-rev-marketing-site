import { responsiveFontSizes, ThemeOptions, createTheme } from '@mui/material/styles';
import Hero from '../components/Hero/Hero.theme';
import Card from '../components/Card/Card.theme';
import Media from '../components/Media/Media.theme';
import Quote from '../components/Quote/Quote.theme';
import Header from '../components/Header/Header.theme';
import Section from '../components/Section/Section.theme';
import Link from '../components/Link/Link.theme';
import Text from '../components/Text/Text.theme';
import NavigationBar from '../components/NavigationBar/NavigationBar.theme';
import NavigationItem from '../components/NavigationItem/NavigationItem.theme';
import Collection from '../components/Collection/Collection.theme';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';

const baseTheme: ThemeOptions = {
  spacing: 8,
  shape: {
    borderRadius: 8
  },
  breakpoints: {
    // Add any custom breakpoints here
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    // Customize add and/or remove as necesary
    body1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    body2: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    h1: {
      fontFamily: 'Open Sans',
      fontSize: '4rem',
      lineHeight: 1.25,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h2: {
      fontFamily: 'Open Sans',
      fontSize: '3rem',
      lineHeight: 1.25,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h3: {
      fontFamily: 'Open Sans',
      fontSize: '2rem',
      lineHeight: 1.375,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h4: {
      fontFamily: 'Open Sans',
      fontSize: '1.5rem',
      lineHeight: 1.5,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h5: {
      fontFamily: 'Open Sans',
      fontSize: '1.25rem',
      lineHeight: 1.2,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h6: {
      fontFamily: 'Open Sans',
      fontSize: '1.125rem',
      lineHeight: 1.3333,
      fontWeight: 600,
      fontStyle: 'normal'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#9146ff',
      light: '#9146ff',
      dark: '#9146ff',
      contrastText: 'white'
    },
    secondary: {
      main: '#ffff55',
      light: '#ffff55',
      dark: '#c6b300',
      contrastText: 'white'
    },
    text: {
      primary: '#00030B',
      secondary: '#E5E5E5',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    error: {
      main: '#ff1744',
      light: 'rgb(255, 69, 105)',
      dark: 'rgb(178, 16, 47)',
      contrastText: '#fff'
    },
    common: {
      black: '#00030B',
      white: '#FFFFFF'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff'
    },
    backgroundOption: {
      main: '#FFF',
      light: '#F7F7F7'
    }
  }
};

const createSchemeTheme = (schemeKey?: string) => {
  const baseSchemeTheme = createTheme(baseTheme);

  const schemeTheme = createTheme(
    merge(
      { scheme: camelCase(schemeKey) },
      baseSchemeTheme,
      ...[
        Header(baseSchemeTheme),
        Text(baseSchemeTheme),
        Card(baseSchemeTheme),
        Quote(baseSchemeTheme),
        Media(baseSchemeTheme),
        Hero(baseSchemeTheme),
        NavigationItem(baseSchemeTheme),
        NavigationBar(baseSchemeTheme),
        Link(baseSchemeTheme),
        Section(baseSchemeTheme),
        Collection(baseSchemeTheme)
      ],
      {
        createSchemeTheme,
        components: {
          // CollectionAccordionMedia:
          MuiContainer: {
            styleOverrides: {
              root: {
                'paddingLeft': baseSchemeTheme.spacing(4),
                'paddingRight': baseSchemeTheme.spacing(4),
                [baseSchemeTheme.breakpoints.up('sm')]: {
                  paddingLeft: baseSchemeTheme.spacing(6),
                  paddingRight: baseSchemeTheme.spacing(6)
                },
                [baseSchemeTheme.breakpoints.up('lg')]: {
                  paddingLeft: baseSchemeTheme.spacing(10),
                  paddingRight: baseSchemeTheme.spacing(10)
                },
                '& .MuiContainer-disableGutters': {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              }
            }
          },
          Header: {
            height: 80,
            styleOverrides: {
              root: {
                '& img': {
                  width: 180,
                  height: 'auto'
                }
              },
              contentContainer: {
                'backgroundColor': 'black',
                'width': '100%',
                'maxWidth': baseSchemeTheme.breakpoints.values.xl,
                'margin': 'auto',
                'paddingLeft': baseSchemeTheme.spacing(4),
                'paddingRight': baseSchemeTheme.spacing(4),
                [baseSchemeTheme.breakpoints.up('sm')]: {
                  paddingLeft: baseSchemeTheme.spacing(6),
                  paddingRight: baseSchemeTheme.spacing(6)
                },
                [baseSchemeTheme.breakpoints.up('lg')]: {
                  paddingLeft: baseSchemeTheme.spacing(10),
                  paddingRight: baseSchemeTheme.spacing(10)
                },
                'height': 80,
                '& svg[class*="Header-logo"]': {
                  maxHeight: 36
                },
                '& img[class*="Header-logo"]': {
                  height: 33,
                  width: 'auto'
                },
                '& a': {
                  textDecoration: 'none',
                  [baseSchemeTheme.breakpoints.down('md')]: {
                    display: 'flex',
                    justifyContent: 'center'
                  }
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }
            }
          },
          NavigationBar: {
            styleOverrides: {
              root: {
                '& .MuiLink-root': {
                  'display': 'flex',
                  'alignItems': 'center',
                  'padding': 10,
                  'color': 'white',
                  '&.MuiLink-selected': {
                    fontWeight: 400
                  },
                  [baseSchemeTheme.breakpoints.down('md')]: {
                    color: 'black',
                    textAlign: 'center'
                  }
                }
              }
            }
          },
          Footer: {
            // to do: find out why was this declared here
            //   mobileMenuBreakpoint: 'md',
            styleOverrides: {
              root: {
                'padding': baseSchemeTheme.spacing(6, 2, 12),
                //to do: add this colors
                'backgroundColor': baseSchemeTheme.palette.backgroundOption?.light,
                [baseSchemeTheme.breakpoints.up('md')]: {
                  padding: baseSchemeTheme.spacing(8, 5)
                },

                '& [class*="Media-root"]': {
                  height: baseSchemeTheme.spacing(2.5)
                },

                '& .MuiList-root': {
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 0,
                  marginLeft: 'auto',

                  [baseSchemeTheme.breakpoints.up('md')]: {
                    justifyContent: 'flex-end'
                  }
                },

                '& .MuiListItem-root': {
                  width: 'auto'
                },

                '& .MuiLink-root': {
                  //to do: add this colors
                  // 'color': baseSchemeTheme.palette.text.main,

                  '&:hover': {
                    color: baseSchemeTheme.palette.primary.main
                  }
                }
              }
            }
          }
        }
      }
    )
  );
  // console.log('CreateSchemeTheme', schemeTheme);
  return responsiveFontSizes(schemeTheme);
};

const theme = createSchemeTheme();
export default theme;
