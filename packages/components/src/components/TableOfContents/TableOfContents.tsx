import React from 'react';
import { Box, Typography } from '@mui/material';
import { TableOfContentsProps } from './TableOfContents.types';

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  return (
    <Box>
      <Typography variant="h6">Table of Contents</Typography>
      <Box component="ul">
        {content.map((heading) => (
          <Box component="li" key={heading.id} ml={heading.level === 1 ? 0 : 2}>
            <Typography variant={`h${heading.level}`} component="a" href={`#${heading.id}`}>
              {heading.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TableOfContents;
