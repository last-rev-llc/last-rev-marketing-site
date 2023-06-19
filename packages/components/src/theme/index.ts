import { responsiveFontSizes, ThemeOptions, createTheme } from '@mui/material/styles';
import Hero from '../components/Hero/Hero.theme';
import Card from '../components/Card/Card.theme';
import CardMedia from '../components/CardMedia/CardMedia.theme';
import Media from '../components/Media/Media.theme';
import Quote from '../components/Quote/Quote.theme';
import Header from '../components/Header/Header.theme';
import HeaderNavLink from '../components/Header/HeaderNavLink/HeaderNavLink.theme';
import HeaderNavGroup from '../components/Header/HeaderNavGroup/HeaderNavGroup.theme';
import HeaderNavLinkNested from '../components/Header/HeaderNavLinkNested/HeaderNavLinkNested.theme';
import Section from '../components/Section/Section.theme';
import Link from '../components/Link/Link.theme';
import Block from '../components/Block/Block.theme';
import Person from '../components/Person/Person.theme';
import GlobalFooter from '../components/GlobalFooter/GlobalFooter.theme';
import TableOfContents from '../components/TableOfContents/TableOfContents.theme';
import Text from '../components/Text/Text.theme';
import NavigationBar from '../components/NavigationBar/NavigationBar.theme';
import NavigationItem from '../components/NavigationItem/NavigationItem.theme';
import Collection from '../components/Collection/Collection.theme';
import CollectionCarousel from '../components/CollectionCarousel/CollectionCarousel.theme';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';
import createGridMixin from './mixins/createGridMixin';

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
      xl: 1536,
      xxl: 3840
    }
  },
  mixins: {
    gridContainer: createGridMixin // this gives your mixin the name `gridContainer`
  },
  typography: {
    fontSize: 16,
    fontFamily: "'Open Sans', 'sans-serif'",
    h1: {
      fontSize: '2.65rem',
      fontWeight: 100,
      lineHeight: 1.25,
      letterSpacing: '.025em'
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 100,
      lineHeight: 1.25,
      paddingBoddom: 16,
      letterSpacing: '.025em'
    },
    h3: {
      fontSize: '1.55rem',
      fontWeight: 100,
      lineHeight: 1.5,
      letterSpacing: '.025em'
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 100,
      lineHeight: 1.5,
      letterSpacing: '.025em'
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 100,
      lineHeight: 1.25,
      letterSpacing: '.025em'
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 100,
      lineHeight: 1.125,
      letterSpacing: '.025em'
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body3: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '21px'
    },
    body: {
      // fontFamily: "'Open Sans', 'sans-serif'",
      fontWeight: 400
    },
    bodyXSmall: {
      fontWeight: 400,
      fontSize: '.75rem',
      lineHeight: 1.25
    },
    bodySmall: {
      fontWeight: 400,
      fontSize: '.875rem',
      lineHeight: 1.25
    },
    bodyLarge: {
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.625
    },
    heading: {
      fontWeight: 700
    }
  },
  palette: {
    mode: 'light',
    ...{
      white: {
        main: '#FFF',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      black: {
        main: '#000',
        contrastText: '#FFF'
      }
    },
    primary: {
      main: '#9146ff',
      light: '#a76aff',
      dark: '#6530b2',
      contrastText: 'white'
    },
    secondary: {
      main: '#ffff55',
      light: '#ffff55',
      dark: '#c6b300',
      contrastText: 'white'
    },

    text: {
      primary: '#170262',
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
      light: '#F7F7F7',
      dark: '#000'
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
        HeaderNavLink(baseSchemeTheme),
        HeaderNavGroup(baseSchemeTheme),
        HeaderNavLinkNested(baseSchemeTheme),
        Text(baseSchemeTheme),
        Block(baseSchemeTheme),
        Person(baseSchemeTheme),
        Card(baseSchemeTheme),
        CardMedia(baseSchemeTheme),
        Quote(baseSchemeTheme),
        GlobalFooter(baseSchemeTheme),
        Media(baseSchemeTheme),
        Hero(baseSchemeTheme),
        NavigationItem(baseSchemeTheme),
        NavigationBar(baseSchemeTheme),
        Link(baseSchemeTheme),
        Section(baseSchemeTheme),
        Collection(baseSchemeTheme),
        CollectionCarousel(baseSchemeTheme),
        TableOfContents(baseSchemeTheme)
      ],
      {
        createSchemeTheme,
        components: {
          MuiContainer: {
            defaultProps: {
              maxWidth: 'xl'
            },
            styleOverrides: {
              root: {
                [baseSchemeTheme.breakpoints.down('sm')]: {
                  'paddingLeft': baseSchemeTheme.spacing(5),
                  'paddingRight': baseSchemeTheme.spacing(5),
                  '&.MuiContainer-disableGutters': {
                    paddingLeft: 0,
                    paddingRight: 0
                  }
                },

                [baseSchemeTheme.breakpoints.up('sm')]: {
                  paddingLeft: baseSchemeTheme.spacing(10),
                  paddingRight: baseSchemeTheme.spacing(10)
                },

                '&.MuiContainer-disableGutters': {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              }
            }
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                [baseSchemeTheme.breakpoints.down('sm')]: {
                  'paddingLeft': baseSchemeTheme.spacing(5),
                  'paddingRight': baseSchemeTheme.spacing(5),
                  '&.MuiContainer-disableGutters': {
                    paddingLeft: 0,
                    paddingRight: 0
                  }
                },

                [baseSchemeTheme.breakpoints.up('sm')]: {
                  paddingLeft: baseSchemeTheme.spacing(10),
                  paddingRight: baseSchemeTheme.spacing(10)
                },

                '&.MuiContainer-disableGutters': {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              }
            }
          },

          Quote: {
            styleOverrides: {
              root: {}
            }
          },
          TableOfContents: {
            styleOverrides: {
              root: {}
            }
          }
        }
      }
    )
  );

  return schemeTheme; //responsiveFontSizes(schemeTheme);
};

const theme = createSchemeTheme();
export default theme;
