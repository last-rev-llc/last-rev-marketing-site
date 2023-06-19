import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import MuiCardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { CardMediaProps } from './CardMedia.types';
import Link from '../Link';

import getFirstOfArray from '../../utils/getFirstOfArray';
import useThemeProps from '../../utils/useThemeProps';

export const CardMedia = (inProps: CardMediaProps) => {
  if (!inProps?.media?.length) return null;

  const props: CardMediaProps = useThemeProps({
    name: 'CardMedia',
    props: inProps
  });

  const { variant, id, media, link, loading, sidekickLookup } = props;

  const image = getFirstOfArray(media);

  const ownerState = {
    variant
  };

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} data-testid="CardMedia" {...sidekick(sidekickLookup)} {...(props as any)}>
        {!!link ? <CardLink component={Link} noLinkStyle {...(link as any)} /> : null}
        {image || loading ? (
          // @ts-ignore: TODO
          <Media>
            {!loading && (
              <ContentModule {...sidekick(sidekickLookup, 'media')} {...image} data-testid="CardMedia-media" />
            )}
            {loading && (
              <Skeleton>
                <ContentModule {...sidekick(sidekickLookup, 'media')} {...image} testId="CardMedia-media" />
              </Skeleton>
            )}
          </Media>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' && prop !== 'sidekickLookup' && prop !== 'media' && prop !== 'link' && prop !== 'ownerState';

const Root = styled(MuiCard, {
  name: 'CardMedia',
  slot: 'Root',
  shouldForwardProp: (prop) => shouldForwardProp(prop as string) && prop !== 'id',
  overridesResolver: (_, styles) => [styles.root]
})<CardMediaProps>(() => ({}));

const CardLink = styled(CardActionArea, {
  name: 'CardMedia',
  slot: 'CardLink',

  overridesResolver: (_, styles) => [styles.cardLink]
})(() => ({}));

const Media = styled(MuiCardMedia, {
  name: 'CardMedia',
  slot: 'CardMedia',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.cardMedia]
})(() => ({}));

export default CardMedia;
