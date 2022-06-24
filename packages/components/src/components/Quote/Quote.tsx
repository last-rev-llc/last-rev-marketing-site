import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '../ErrorBoundary';
import Media, { MediaProps } from '../Media';
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
        {logo && <MediaItem {...logo} {...sidekick(sidekickLookup?.logo)} />}
        {quote && (
          <QuoteText {...sidekick(sidekickLookup?.quote)}>
            <QuoteSymbol>"</QuoteSymbol>
            {quote}
            <QuoteSymbol>"</QuoteSymbol>
          </QuoteText>
        )}
        {actions && (
          <ActionsRoot>
            {actions.map((action) => (
              <Link {...action} key={action.id} />
            ))}
          </ActionsRoot>
        )}
        {authorImage || authorName || authorTitle ? (
          <AuthorRoot>
            {authorImage && <AuthorImage {...authorImage} {...sidekick(sidekickLookup?.authorImage)} />}
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
})``;

const AuthorRoot = styled(Box, {
  name: 'Quote',
  slot: 'AuthorRoot',
  overridesResolver: (_, styles) => [styles.authorRoot]
})`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MediaItem = styled(Media, {
  name: 'Quote',
  slot: 'MediaItem',
  overridesResolver: (_, styles) => [styles.mediaItem]
})<MediaProps>(() => ({
  maxWidth: '120px',
  marginBottom: '8px'
}));

const AuthorImage = styled(Media, {
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
