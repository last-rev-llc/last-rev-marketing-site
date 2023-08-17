import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '../ErrorBoundary';
import { MediaProps } from '../Media';
import ContentModule from '../ContentModule';
import Link from '../Link';
import sidekick from '@last-rev/contentful-sidekick-util';
import { QuoteProps } from './Quote.types';

export const Quote = ({
  sidekickLookup,
  logo,
  quote,
  authorName,
  authorTitle,
  authorImage,
  actions,
  ...props
}: QuoteProps) => {
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} {...props} data-testid="Quote">
        {logo && <MediaItem {...(logo as any)} {...sidekick(sidekickLookup?.logo)} />}
        {quote && (
          <QuoteText {...sidekick(sidekickLookup?.quote)}>
            <QuoteSymbol>"</QuoteSymbol>
            {quote}
            <QuoteSymbol>"</QuoteSymbol>
          </QuoteText>
        )}
        {actions && (
          <ActionsRoot>
            {actions.map((action) => (action?.__typename == 'Link' ? <Link {...action} key={action?.id} /> : null))}
          </ActionsRoot>
        )}
        {authorImage || authorName || authorTitle ? (
          <AuthorRoot>
            {authorImage && <AuthorImage {...(authorImage as any)} {...sidekick(sidekickLookup?.authorImage)} />}
            <Box>
              {authorName && <AuthorName {...sidekick(sidekickLookup?.authorName)}>{authorName}</AuthorName>}
              {authorTitle && <AuthorTitle {...sidekick(sidekickLookup?.authorTitle)}>{authorTitle}</AuthorTitle>}
            </Box>
          </AuthorRoot>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Quote',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<QuoteProps>(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  '& .MuiTypography-root': {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  }
}));

const AuthorRoot = styled(Box, {
  name: 'Quote',
  slot: 'AuthorRoot',
  overridesResolver: (_, styles) => [styles.authorRoot]
})<{ variant?: string }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const MediaItem = styled(ContentModule, {
  name: 'Quote',
  slot: 'MediaItem',
  overridesResolver: (_, styles) => [styles.mediaItem]
})<MediaProps>(({ theme }) => ({
  maxWidth: '120px',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    margin: 'auto',
    maxWidth: '150px',
    marginBottom: theme.spacing(2)
  }
}));

const AuthorImage = styled(ContentModule, {
  name: 'Quote',
  slot: 'AuthorImage',
  overridesResolver: (_, styles) => [styles.authorImage]
})<MediaProps>(() => ({
  maxWidth: '60px',
  margin: '20px 20px 20px 0px',
  borderRadius: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover'
}));

const QuoteText = styled(Typography, {
  name: 'Quote',
  slot: 'QuoteText',
  overridesResolver: (_, styles) => [styles.quoteText]
})`
  font-size: 20px;
`;

const AuthorName = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})`
  font-weight: 700;
  font-size: 18px;
`;

const QuoteSymbol = styled('span', {
  name: 'Quote',
  slot: 'QuoteSymbol',
  overridesResolver: (_, styles) => [styles.quoteSymbol]
})``;

const AuthorTitle = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorTitle',
  overridesResolver: (_, styles) => [styles.authorTitle]
})`
  font-size: 15px;
`;

const ActionsRoot = styled(Typography, {
  name: 'Quote',
  slot: 'ActionsRoot',
  overridesResolver: (_, styles) => [styles.actionsRoot]
})``;

export default Quote;
