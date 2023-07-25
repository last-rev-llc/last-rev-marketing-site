Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import { Box } from '@mui/material';
import { TableOfContentsProps } from './TableOfContents.types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import sidekick from '@last-rev/contentful-sidekick-util';

export function TableOfContents({ sidekickLookup, content = [], ...props }: TableOfContentsProps) {
  return (
    <Root {...sidekick(sidekickLookup)} {...props} data-testid="TableOfContents">
      <Typography variant="h3">Table of Contents</Typography>
      <Box component="ul">
        {content.map((heading) => (
          <Box component="li" key={heading?.id} ml={heading?.level === 1 ? 0 : 2}>
            <Typography variant={`h${heading?.level as 1 | 2 | 3 | 4 | 5 | 6}`} component="a" href={`#${heading?.id}`}>
              {heading?.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Root>
  );
}

const Root = styled(Box, {
  name: 'TableOfContents',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<TableOfContentsProps>(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  '& .MuiTypography-root': {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
  // based on mui variant h1-h6, indent the content and make all text the same size
  '& a.MuiTypography-h1': {
    marginLeft: 0,
    fontSize: theme.typography.h6.fontSize
  },
  '& a.MuiTypography-h2': {
    marginLeft: theme.spacing(2),
    fontSize: theme.typography.h6.fontSize
  },
  '& a.MuiTypography-h3': {
    marginLeft: theme.spacing(4),
    fontSize: theme.typography.h6.fontSize
  },
  '& a.MuiTypography-h4': {
    marginLeft: theme.spacing(6),
    fontSize: theme.typography.h6.fontSize
  },
  '& a.MuiTypography-h5': {
    marginLeft: theme.spacing(8),
    fontSize: theme.typography.h6.fontSize
  },
  '& a.MuiTypography-h6': {
    marginLeft: theme.spacing(10),
    fontSize: theme.typography.h6.fontSize
  }
}));

export default TableOfContents;

"""
Describe how the file interacts with other components in the application.
Identify whether the component is a server or client-side component.
Create a markdown table listing all the props used by this component.
Provide detailed descriptions of user interaction and how the component handles state.
Describe all sub-components and their interactions with this component.
List out any questions developers may have while working on this codebase that relate to this file.
List out any known issues or bugs with the component and any todo items that need to be addressed.
Template:
Summary:
<brief overview of the file and all its major components>

Import statements:
<describe the imports and dependencies>

Component:
<Summary of component>

Hooks:
<list of hooks with descriptions>

Event Handlers:
<list of Event Handlers with descriptions>

Rendered components:
<list of Rendered components with descriptions>

Interaction Summary:
<a summary of how the file could interact with the rest of the application>

Developer Questions:
<a list of questions Developers working with this component may have the following questions when debugging>