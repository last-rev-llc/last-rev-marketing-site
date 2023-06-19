import React from 'react';
import sidekick from '@last-rev/contentful-sidekick-util';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Breakpoint, useTheme } from '@mui/system';

import Link from '../Link';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import useThemeProps from '../../utils/useThemeProps';

import { HeaderProps } from './Header.types';
import { NavigationItemProps } from '../NavigationItem/NavigationItem.types';

export const Header = (inProps: HeaderProps) => {
  const props = useThemeProps({
    name: 'Header',
    props: inProps
  });

  const { variant, logo, logoUrl, navigationItems, sidekickLookup } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  const theme = useTheme();

  const menuBreakpoint: Breakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';

  const [menuVisible, setMenuVisible] = React.useState(false);

  const ownerState = {
    color: props.colorScheme
  };

  return (
    <ErrorBoundary>
      <>
        <Root
          {...sidekick(sidekickLookup)}
          ownerState={ownerState}
          variant={variant}
          elevation={trigger ? 2 : 0}
          menuVisible={menuVisible}
          menuBreakpoint={menuBreakpoint}
          {...props}>
          <Container>
            <ContentContainer menuVisible={menuVisible} disableGutters isElevated={trigger}>
              {logo ? (
                <LogoRoot noLinkStyle href={logoUrl} __typename="Link" aria-label={'Go to homepage'}>
                  <Logo {...logo} priority alt={logo?.title ?? 'Go to homepage'} isElevated={trigger} />
                </LogoRoot>
              ) : null}

              {!!navigationItems?.length && (
                <HeaderMenuNav component="nav" menuVisible={menuVisible}>
                  <HeaderMenuNavItems>
                    {navigationItems.map((navItem: any, index: number) => (
                      <HeaderMenuNavItem key={`${navItem.id}-${index}`}>
                        <ContentModule
                          {...(navItem as NavigationItemProps)}
                          variant="headerLink"
                          onRequestClose={() => {
                            setMenuVisible(false);
                            if (document.activeElement instanceof HTMLElement) {
                              document.activeElement.blur();
                            }
                          }}
                          __typename="NavigationItem"
                          menuVisible={menuVisible}
                        />
                      </HeaderMenuNavItem>
                    ))}
                  </HeaderMenuNavItems>
                </HeaderMenuNav>
              )}

              <HeaderMenuCtas>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setMenuVisible(!menuVisible)}
                  sx={{ display: { xs: 'block', lg: 'none' }, padding: 0, marginRight: '-4px' }}
                  size="large">
                  <MenuIcon sx={{ display: menuVisible ? 'none' : 'block', fontSize: 42 }} />
                  <CloseIcon sx={{ display: !menuVisible ? 'none' : 'block', fontSize: 42 }} />
                </IconButton>
              </HeaderMenuCtas>
            </ContentContainer>
          </Container>
        </Root>
      </>
    </ErrorBoundary>
  );
};
const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'ownerState' &&
  prop !== 'menuVisible' &&
  prop !== 'menuBreakpoint' &&
  prop !== 'isElevated' &&
  prop !== 'sidekickLookup' &&
  prop !== 'colorScheme' &&
  prop !== 'logo' &&
  prop !== 'svgContent' &&
  prop !== 'logoUrl' &&
  prop !== 'navigationItems' &&
  prop !== 'legacyBehavior';

const Root = styled(AppBar, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp: (prop) => shouldForwardProp(prop as string) && prop !== 'id',
  overridesResolver: (_, styles) => [styles.root]
})<HeaderProps & { ownerState: any; menuVisible: boolean }>(() => ({}));

const LogoRoot = styled(Link, {
  name: 'Header',
  slot: 'LogoRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.logoRoot]
})(() => ({}));

const Logo = styled(ContentModule, {
  name: 'Header',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})<{ variant?: string }>(() => ({
  height: '100%',
  width: 'auto'
}));

const HeaderMenuCtas = styled(List, {
  name: 'Header',
  slot: 'HeaderMenuCtas',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuCtas]
})(() => ({}));

const HeaderMenuNav = styled(Box, {
  name: 'Header',
  slot: 'HeaderMenuNav',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuNav]
})<{ menuVisible?: boolean }>``;

const HeaderMenuNavItems = styled(List, {
  name: 'Header',
  slot: 'headerMenuNavItems',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuNavItems]
})<{ hasSuperNav?: boolean }>``;

const HeaderMenuNavItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuNavItem',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuNavItem]
})``;

const ContentContainer = styled(Toolbar, {
  name: 'Header',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string; menuVisible?: boolean; legacyBehavior?: boolean; isElevated?: boolean }>``;
export default Header;
