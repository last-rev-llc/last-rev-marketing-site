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
    fontSize: 16,
    // fontFamily: "'Open Sans', 'sans-serif'",
    // fontStyle: 'normal',
    // fontWeight: {
    //   regular: 400,
    //   medium: 500,
    //   semibold: 600
    // },
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      lineHeight: 1.25
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.25
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1.125rem',
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
      fontFamily: "'Open Sans', 'sans-serif'",
      fontWeight: 400
    },
    heading: {
      fontFamily: "'Open Sans', 'sans-serif'",
      fontWeight: 700
    }
  },
  palette: {
    mode: 'light',
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
                }
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
                  'color': 'white',
                  '&.MuiLink-selected': {
                    fontWeight: 400
                  },
                  '&:hover': {
                    color: baseSchemeTheme.palette.primary.light
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
          },
          Hero: {
            styleOverrides: {
              contentContainer: {
                //'backgroundColor': 'cyan',
                '& > .MuiGrid-container': {
                  alignItems: 'center'
                }
                // '& a': {
                //   fontWeigth: 800,
                //   padding: '8px 16px',
                //   textDecoration: 'none',
                //   borderRadius: '10px',
                //   background: 'linear-gradient(90deg, rgba(92,83,167,1) 23%, rgba(249,112,187,1) 100%)'
                // }
              }
            }
          },
          Link: {
            styleOverrides: {
              root: {
                // background: 'cyan'
              }
            }
          },
          Media: {
            styleOverrides: {
              root: {
                display: 'block',
                width: '100%',
                height: '100%'
              }
            }
          },
          Section: {
            styleOverrides: {
              root: {
                padding: baseSchemeTheme.spacing(8),
                [baseSchemeTheme.breakpoints.up('md')]: {
                  paddingLeft: baseSchemeTheme.spacing(10),
                  paddingRight: baseSchemeTheme.spacing(10)
                },
                // NOTE: Framework should have smart default that stacks vertically on mobile
                [baseSchemeTheme.breakpoints.down('md')]: {
                  '& > [class*="Section-gridContainer"] > [class*="Section-gridItem"]': {
                    flex: '0 100%'
                  }
                }
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
              root: {
                //color: '#fff'
                // '& .MuiTypography-root-Quote-authorName': {
                //   color: 'cyan'
                // }
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
