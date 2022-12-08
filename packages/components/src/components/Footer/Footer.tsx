import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import sidekick from '@last-rev/contentful-sidekick-util';
import Media, { MediaProps } from '../Media';
import Link from '../Link';
import { CollectionProps } from '../Collection';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';
import theme from '../../theme';

export interface FooterProps {
  logo?: MediaProps;
  logoUrl?: string;
  navigationItems?: CollectionProps[];
  sidekickLookup: any;
  brandAndYear?: string;
}

export const Footer = ({ logo, logoUrl, navigationItems, brandAndYear, sidekickLookup }: FooterProps) => {
  return (
    <ErrorBoundary>
      <Root sx={{ backgroundColor: 'black' }} {...sidekick(sidekickLookup)}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} md={2} data-testid="Footer-Logo" justifyContent={['flex-start']} flexDirection="row">
              {!!logo && (
                <Link
                  sx={{
                    '& .MuiContainer-root .Footer-root [class*="Media-root"]': {
                      maxWidth: '100px'
                    }
                  }}
                  href={logoUrl || '/'}
                  {...sidekick(sidekickLookup?.logo)}>
                  <Media {...logo} />
                </Link>
              )}
            </Grid>
            <Grid
              xs={12}
              md={8}
              display={'flex'}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              item
              flexDirection="row">
              <List data-testid="Footer-Navigation">
                {navigationItems?.map((collection) => (
                  <ListItem
                    data-testid="Footer-Navigation-Item"
                    sx={{
                      '& .MuiGrid-container': {
                        flexDirection: 'row'
                      }
                    }}>
                    <ContentModule {...collection} key={collection.id} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Divider sx={{ width: '100%', height: 1, backgroundColor: theme.palette.primary.light }} />
            <Box pt={[2, 8]} pb={[2, 8]} pl={[3, 0]} pr={[3, 0]} sx={{ display: 'flex', backgroundColor: 'black' }}>
              <Typography variant="body1" sx={{ color: theme.palette.primary.light }}>
                {brandAndYear}
              </Typography>
            </Box>
          </Grid>
        </Container>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Footer',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})``;

export default Footer;
