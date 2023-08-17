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
