import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import sidekick from '@last-rev/contentful-sidekick-util';
import Media, { MediaProps } from '../Media';
import Link from '../Link';
import { NavigationItemProps } from '../NavigationItem';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';

export interface FooterProps {
  logo?: MediaProps;
  logoUrl?: string;
  navigationItems?: NavigationItemProps[];
  sidekickLookup: any;
}

export const Footer = ({ logo, logoUrl, navigationItems, sidekickLookup }: FooterProps) => {
  return (
    <ErrorBoundary>
      <Root maxWidth="xl" {...sidekick(sidekickLookup)}>
        <Grid container spacing={{ xs: 4, md: 2 }}>
          <Grid item xs={12} md={2} data-testid="Footer-Logo" alignSelf="center">
            {!!logo && (
              <Link href={logoUrl || '/'} {...sidekick(sidekickLookup?.logo)}>
                <Media {...logo} />
              </Link>
            )}
          </Grid>
          <Grid item xs={12} md={10}>
            <List data-testid="Footer-Navigation">
              {navigationItems?.map((navigationItem) => (
                <ListItem data-testid="Footer-Navigation-Item">
                  <ContentModule
                    {...navigationItem}
                    __typename="Link"
                    data-testid="Footer-Link"
                    subNavigation={null}
                    key={navigationItem.id}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Container, {
  name: 'Footer',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})();

export default Footer;
