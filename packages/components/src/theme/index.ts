import { responsiveFontSizes, ThemeOptions, createTheme } from '@mui/material/styles';
import Hero from '../components/Hero/Hero.theme';
import Card from '../components/Card/Card.theme';
import Accordion from '../components/Accordion/Accordion.theme';
import Media from '../components/Media/Media.theme';
import Quote from '../components/Quote/Quote.theme';
import Header from '../components/Header/Header.theme';
import Section from '../components/Section/Section.theme';
import Link from '../components/Link/Link.theme';
import Form from '../components/Form/Form.theme';
import TableOfContents from '../components/TableOfContents/TableOfContents.theme';
import Text from '../components/Text/Text.theme';
import NavigationBar from '../components/NavigationBar/NavigationBar.theme';
import NavigationItem from '../components/NavigationItem/NavigationItem.theme';
import Collection from '../components/Collection/Collection.theme';
import CollectionCarousel from '../components/CollectionCarousel/CollectionCarousel.theme';
import CollectionAccordion from '../components/CollectionAccordion/CollectionAccordion.theme';
import CollectionFiltered from '../components/CollectionFiltered/CollectionFiltered.theme';
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
    fontSize: 16,
    h1: {
      fontSize: '2.65rem',
      fontWeight: 600,
      lineHeight: 1.25
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.25,
      paddingBottom: 16
    },
    h3: {
      fontSize: '1.55rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h5: {
      fontSize: '1.15rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1.15rem',
      fontWeight: 600,
      lineHeight: 1.5555
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
    heading: {
      // fontFamily: "'Open Sans', 'sans-serif'",
      fontWeight: 700
    }
  },
  palette: {
    mode: 'light',
    ...{
      white: {
        main: '#FFF',
        light: '#FFF',
        dark: '#FFF',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      black: {
        main: '#000',
        light: '#000',
        dark: '#000',
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
      contrastText: 'black'
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
        Text(baseSchemeTheme),
        Card(baseSchemeTheme),
        Quote(baseSchemeTheme),
        Media(baseSchemeTheme),
        Hero(baseSchemeTheme),
        NavigationItem(baseSchemeTheme),
        NavigationBar(baseSchemeTheme),
        Link(baseSchemeTheme),
        Section(baseSchemeTheme),
        Collection(baseSchemeTheme),
        CollectionCarousel(baseSchemeTheme),
        TableOfContents(baseSchemeTheme),
        Form(baseSchemeTheme),
        Accordion(baseSchemeTheme),
        CollectionAccordion(baseSchemeTheme),
        CollectionFiltered(baseSchemeTheme)
      ],
      {
        createSchemeTheme,
        components: {
          MuiContainer: {
            styleOverrides: {
              root: {
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
            mobileMenuBreakpoint: 'md',
            styleOverrides: {
              root: {
                'backgroundColor': 'yellow !important',
                '& img': {
                  width: 180,
                  height: 'auto'
                },
                '&::before': {
                  backgroundColor: 'black'
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
                },
                '[data-csk-entry-type="collection"]': {
                  padding: '24px 0px'
                }
              }
            }
          },

          Section: {
            styleOverrides: {
              root: {
                'main > &': { maxWidth: '100vw' }
              }
            }
          },
          NavigationBar: {
            styleOverrides: {
              root: {
                '& .MuiButton-contained': {
                  textTransform: 'capitalize',
                  fontSize: 17
                },
                '& .MuiLink-root': {
                  'display': 'flex',
                  'alignItems': 'center',
                  'padding': 10,
                  'color': baseSchemeTheme.palette.common.white,

                  '&:hover': {
                    color: baseSchemeTheme.palette.primary.light
                  },

                  [baseSchemeTheme.breakpoints.down('md')]: {
                    color: 'white',
                    textAlign: 'center'
                  },

                  '&.MuiLink-selected': {
                    fontWeight: 400
                  }
                }
              }
            }
          },
          Footer: {
            styleOverrides: {
              root: {
                '& a': {
                  textDecoration: 'none'
                },
                'backgroundColor': 'black',
                '& .MuiGrid-container': {
                  'paddingTop': baseSchemeTheme.spacing(2),
                  '& .MuiGrid-root': {
                    display: 'flex',
                    alignSelf: 'flex-start'
                  }
                },
                '& [class*="Media-root"]': {
                  padding: '40px 0px',
                  display: 'flex',
                  maxWidth: '150px'
                },
                '[data-csk-entry-type="navigationItem"]': {
                  [baseSchemeTheme.breakpoints.down('md')]: {
                    color: 'white',
                    textAlign: 'center'
                  }
                }
              }
            }
          },
          Hero: {
            styleOverrides: {
              contentContainer: {
                '& > .MuiGrid-container': {
                  alignItems: 'center'
                },
                '& [class*="Hero-actionsRoot"]': {
                  '& a': {
                    textDecoration: 'none'
                  },
                  [baseSchemeTheme.breakpoints.down('md')]: {
                    'maxWidth': 200,
                    'margin': 'auto',
                    'flexDirection': 'column',
                    '& :nth-child(n)': {
                      marginBottom: baseSchemeTheme.spacing(2)
                    },
                    '& :last-child': {
                      marginBottom: baseSchemeTheme.spacing(0)
                    }
                  }
                }
              }
            }
          },
          Media: {
            styleOverrides: {
              root: {
                display: 'block',
                width: '100%',
                height: 'auto'
              }
            }
          },

          Card: {
            styleOverrides: {
              root: {
                'width': '100%',
                'backgroundColor': baseSchemeTheme.palette.background.default,
                '& .MuiTypography-h3': {
                  paddingBottom: baseSchemeTheme.spacing(2)
                },
                '& .MuiCardMedia-root': {
                  '& img': {
                    width: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover'
                  },
                  '& svg': {
                    width: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover'
                  }
                },
                '& .MuiCard-root': {
                  height: '100%'
                },
                '& .MuiCardContent-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: '100%'
                },
                '& .MuiCardActions-root': {
                  marginTop: 'auto'
                }
              }
            }
          },
          Collection: {
            styleOverrides: {
              root: {
                'margin': '0 auto',
                '[class*="Section-gridContainer"]': {
                  'display': 'grid',
                  'gridAutoRows': '1fr',
                  '[class*="Box-content"]': {
                    display: 'block'
                  }
                },
                '[class*="Section-gridItem"]': {
                  display: 'flex',
                  justifyContent: 'center',
                  flexBasis: '100%',
                  maxWidth: '100%',
                  height: '100%',
                  [baseSchemeTheme.breakpoints.up('md')]: {
                    flexBasis: '50%'
                  },
                  [baseSchemeTheme.breakpoints.up('lg')]: {
                    flexBasis: '33.333333%'
                  }
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

  return responsiveFontSizes(schemeTheme);
};

const theme = createSchemeTheme();
export default theme;
