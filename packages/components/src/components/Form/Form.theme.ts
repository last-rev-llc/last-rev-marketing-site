import {
  ComponentsOverrides,
  ComponentsVariants,
  Theme,
  ThemeOptions,
  alpha
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Form'] = {
  root: ({ theme, ownerState }) => ({
    'width': '100%',

    ...((ownerState?.variant === 'hubspotFormDefault' ||
      ownerState?.variant === 'hubspotFormDefaultThin') && {
      padding: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10, 4, 8, 0)
      },

      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(18, 4, 16, 0)
      }
    }),

    ...(ownerState?.variant === 'hubspotFormChecks' && {
      padding: theme.spacing(10, 3),
      marginTop: theme.spacing(5),
      overflow: 'hidden'
    }),

    ...(ownerState?.variant === 'hubspotFormHighlight' && {
      height: '100%'
    }),

    '& form': {
      'display': 'grid',
      'gap': theme.spacing(3),

      ...(ownerState?.variant === 'hubspotFormSidebar' && {
        gap: theme.spacing(2)
      }),

      ...(ownerState?.variant === 'hubspotFormFooter' && {
        gap: theme.spacing(2),

        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'auto min-content',
          gap: theme.spacing(0.5)
        },

        [theme.breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(auto-fit, minmax(0, min-content))',
          gap: theme.spacing(5.75)
        }
      }),

      '& .hs-recaptcha': {
        display: 'none'
      },

      '& fieldset': {
        'maxWidth': '100%',
        'display': 'grid',
        'margin': 0,

        ...((ownerState?.variant === 'hubspotFormDefault' ||
          ownerState?.variant === 'hubspotFormDefaultThin' ||
          ownerState?.variant === 'hubspotFormHighlight') && {
          grid: 'none',
          gap: theme.spacing(3),

          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',

            ...(ownerState?.variant === 'hubspotFormDefaultThin' && {
              gridTemplateColumns: 'initial'
            })
          }
        }),

        ...(ownerState?.variant === 'hubspotFormChecks' && {
          grid: 'none',
          gap: theme.spacing(3),

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))'
          }
        }),

        ...(ownerState?.variant === 'hubspotFormSidebar' && {
          grid: 'none',
          gap: theme.spacing(2),

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'initial'
          }
        }),

        ...(ownerState?.variant === 'hubspotFormFooter' && {
          grid: 'none',
          gap: theme.spacing(2),

          [theme.breakpoints.up('md')]: {
            grid: 'initial',
            gridTemplateColumns: 'minmax(150px, max-content) minmax(150px, max-content)',

            gap: theme.spacing(0.5)
          },

          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'minmax(250px, max-content) minmax(250px, max-content)',
            gap: theme.spacing(1)
          }
        }),

        '& .field.hs-form-field': {
          'marginRight': 0,
          'position': 'relative',
          'width': '100%',
          'float': 'none',
          'background': 'transparent',

          '& .input': {
            'marginRight': 0,

            '& .hs-input': {
              'width': '100%',
              'maxWidth': '100%',
              'padding': theme.spacing(2),
              'color': theme.palette.grey[700],

              ...(ownerState?.variant !== 'hubspotFormFooter' && {
                border: `solid 2px ${theme.palette.grey[300]}`,
                borderRadius: theme.spacing(0.5)
              }),

              ...(ownerState?.variant === 'hubspotFormFooter' && {
                border: 'none',
                borderBottom: `solid 2px ${theme.palette.common.white}`,
                fontSize: theme.typography.body1
              }),

              '&:hover': {
                borderColor: theme.palette.grey[300],
                boxShadow: theme.shadows[1]
              },

              '&:focus': {
                borderColor: theme.palette.grey[300],
                boxShadow: theme.shadows[1]
              },

              '&:focus-visible': {
                outline: `${theme.palette.grey[300]} auto 0px`
              }
            },

            'input': {
              '&': {
                ...theme.typography.body1,

                height: 'auto',

                ...(ownerState?.variant !== 'hubspotFormFooter' && {
                  '&::placeholder': {
                    opacity: 0.7
                  }
                }),

                ...(ownerState?.variant === 'hubspotFormFooter' && {
                  backgroundColor: 'transparent',
                  padding: theme.spacing(1)
                })
              }
            },

            'textarea': {
              ...theme.typography.body1,

              ...(ownerState?.variant !== 'hubspotFormFooter' && {
                'height': 300,
                'maxHeight': '80vh',

                '&::placeholder': {
                  opacity: 0.7
                }
              }),

              ...(ownerState?.variant === 'hubspotFormSidebar' && {
                height: 150,
                maxHeight: '40vh'
              })
            },

            'select': {
              '&': {
                ...theme.typography.body1,

                'appearance': 'none',
                'backgroundImage':
                  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNyAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gXAogICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS45OTc1IDAuNzM3NTQ5TDguNSA2LjQ2MjU1TDE1LjAwMjUgMC43Mzc1NDlMMTcgMi41MDAwNUw4LjUgMTBMMCAyLjUwMDA1TDEuOTk3NSAwLjczNzU0OVoiIGZpbGw9IiNBNEE0QTQiLz4gXAogICAgICAgICAgICAgICAgICAgIDwvc3ZnPg==)',
                'backgroundPosition': 'right center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 17,
                'backgroundOrigin': 'content-box',

                '&.is-placeholder': {
                  color: alpha(theme.palette.grey[700], 0.7)
                }
              }
            },

            '&.error': {
              borderColor: theme.palette.error.main,
              borderWidth: 1
            }
          }
        },
        '& .hs-fieldtype-checkbox.field.hs-form-field': {
          'ul': {
            listStyleType: 'none',
            padding: 0
          },
          '& .hs-form-checkbox': {
            width: 'fit-content',
            marginBottom: theme.spacing(3)
          },
          '& .hs-form-checkbox-display': {
            'display': 'flex',
            'alignItems': 'center',
            'cursor': 'pointer',
            '& .hs-input': {
              visibility: 'hidden',
              width: 20,
              height: 20,
              padding: 0,
              margin: 0
            },
            '& span': {
              ...theme.typography.body1,
              color: theme.palette.grey[600],
              paddingLeft: theme.spacing(1)
            },
            "& input[type='checkbox']::before": {
              width: 20,
              height: 20,
              position: 'absolute',
              cursor: 'pointer',
              backgroundImage:
                'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgcng9IjEuNSIgc3Ryb2tlPSIjQkVCRUJFIi8+Cjwvc3ZnPgo=)',
              content: '""',
              visibility: 'visible'
            },
            "& input[type='checkbox']:checked::before": {
              backgroundImage:
                'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgcng9IjEuNSIgZmlsbD0iIzA1ODBFOCIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMS41IiBzdHJva2U9IiNCRUJFQkUiLz4KPHBhdGggZD0iTTE2Ljk1NTEgNi40NzYxMkwxNS4zODc4IDVMNy45MTI3NCAxMi4wNDc2TDQuNTY3MjcgOC44OTMzMkwzIDEwLjM2OTRMNy45MTI3NyAxNUwxNi45NTUxIDYuNDc2MTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)'
            }
          }
        }
      },

      '& .actions': {
        '& input': {
          ...theme.typography.body1,
          'cursor': 'pointer',
          'backgroundColor': theme.palette.grey[300],
          'color': theme.palette.common.white,
          'border': `3px solid ${theme.palette.grey[300]}`,
          'padding': theme.spacing(0.625, 2.625), // Substract border
          'borderRadius': theme.spacing(0.5),
          'textDecoration': 'none',
          'width': '100%',

          ...(ownerState?.variant === 'hubspotFormHighlight' && {
            backgroundColor: theme.palette.common.black,
            borderColor: theme.palette.common.black,
            borderRadius: theme.spacing(3)
          }),

          '&:hover': {
            borderColor: theme.palette.common.black,
            backgroundColor: theme.palette.grey[300],
            ...(ownerState?.variant === 'hubspotFormHighlight' && {
              backgroundColor: theme.palette.common.black,
              borderColor: theme.palette.common.black,
              color: theme.palette.grey[100]
            })
          },

          '&:active': {
            backgroundColor: theme.palette.grey[300],
            borderColor: theme.palette.common.black
          },

          [theme.breakpoints.up('md')]: {
            ...(ownerState?.variant === 'hubspotFormFooter' && {
              width: 'auto%'
            })
          }
        }
      },

      '& .hs-error-msgs': {
        'top': 'auto',
        'left': theme.spacing(2),
        'right': theme.spacing(2),
        'margin': 0,
        'padding': 0,
        'border': 0,
        'listStyle': 'none',

        '& li label': {
          ...theme.typography.body3,
          display: 'block !important',
          padding: theme.spacing(0.25, 0, 0),
          color:
            ownerState?.variant === 'hubspotFormChecks'
              ? theme.palette.white
              : theme.palette.error.main,
          textAlign: 'left'
        }
      }
    }
  }),

  introText: ({ theme, ownerState }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(2),

    ...(ownerState?.variant === 'hubspotFormFooter' && {
      'marginBottom': theme.spacing(1),

      '.MuiTypography-root': { textAlign: 'left', color: theme.palette.common.white }
    })
  }),

  formOuterContainer: ({ theme, ownerState }) => ({
    ...((ownerState?.variant === 'hubspotFormDefault' ||
      ownerState?.variant === 'hubspotFormDefaultThin') && {
      padding: theme.spacing(4, 3),
      backgroundColor: theme.palette.grey[100],
      border: `solid 2px ${theme.palette.grey[200]}`,
      borderRadius: 12
    }),

    ...(ownerState?.variant === 'hubspotFormChecks' && {
      padding: theme.spacing(4, 3),
      backgroundColor: theme.palette.grey[300],
      border: `solid 2px ${theme.palette.grey[300]}`,
      borderRadius: 12,
      position: 'relative',
      color: theme.palette.common.white
    }),

    ...(ownerState?.variant === 'hubspotFormSidebar' && {
      padding: theme.spacing(2, 0, 6, 0),
      backgroundColor: theme.palette.grey[200],
      borderRadius: 8
    }),

    ...(ownerState?.variant === 'hubspotFormHighlight' && {
      padding: theme.spacing(4),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    })
  }),

  styledChevronIcon: () => ({
    rotate: '180deg'
  }),

  formMessage: ({ theme }) => ({
    ...theme.typography.h2,
    color: theme.palette.common.white,
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  }),

  dotsSquarePrimaryIcon: ({ theme }) => ({
    position: 'absolute',
    display: 'block',
    height: 220,
    width: 439,
    top: theme.spacing(-13),
    right: theme.spacing(-15),
    zIndex: -1,
    path: {
      fill: theme.palette.grey[400]
    }
  }),

  dotsSquareSecondaryIcon: ({ theme }) => ({
    position: 'absolute',
    color: theme.palette.grey[400],
    display: 'block',
    height: 220,
    width: 220,
    bottom: theme.spacing(-3),
    left: theme.spacing(-6),
    zIndex: -1
  }),

  styledFormControlLabel: ({ theme }) => ({
    'border': 'none !important',
    '.MuiFormControlLabel-label': {
      color: theme.palette.common.white,
      fontSize: '18px'
    },
    ':hover': {
      background: 'none'
    }
  }),

  bpIcon: ({ theme }) => ({
    width: 16,
    height: 16,
    backgroundColor: theme.palette.grey[300],
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 3,
    opacity: 0.4
  }),

  bpCheckedIcon: () => ({
    opacity: 0.92,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  }),

  formContainer: ({ theme, ownerState }) => ({
    display: ownerState?.submitted && ownerState?.hasSuccessMessage ? 'none' : 'block',
    ...(ownerState?.variant === 'hubspotFormFooter' && {
      marginTop: theme.spacing(1.5)
    })
  }),

  successMessage: ({ theme }) => ({
    'margin': theme.spacing(3.5, 0),

    '*': {
      color: 'inherit'
    }
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Form'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Form: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
