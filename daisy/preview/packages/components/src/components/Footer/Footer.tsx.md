Document how the provided React file functions as part of a larger application.
"""
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
import Media from '../Media';
import Link from '../Link';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';
import theme from '../../theme';
import { FooterProps } from './Footer.types';

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
                    key={collection.id}
                    data-testid="Footer-Navigation-Item"
                    sx={{
                      '& .MuiGrid-container': {
                        flexDirection: 'row'
                      }
                    }}>
                    <ContentModule {...collection} />
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