import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import sidekick from '@last-rev/contentful-sidekick-util';

import { HeaderNavLinkProps } from './HeaderNavLink.types';
import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

export const HeaderNavLink = ({
  title,
  variant,
  subNavigation,
  sidekickLookup,
  onRequestClose,
  id: navItemId,
  ...props
}: HeaderNavLinkProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onNavItemClick = (evt: any) => {
    if (subNavigation?.length) {
      evt.preventDefault();
      evt.stopPropagation();
      if (document.activeElement instanceof HTMLElement) {
        evt?.target?.blur();
      }
      setOpen(!open);
    } else {
      if (onRequestClose) onRequestClose();
    }
  };

  const onSubNavItemClick = () => {
    setOpen(false);
    if (onRequestClose) onRequestClose();
  };

  const onKeyDown = (evt: any) => {
    if (evt.key === 'Tab' && !open && !!subNavigation?.length) {
      setOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      <Root data-testid="HeaderNavLink" open={open}>
        <NavItemLink
          {...props}
          variant={variant}
          {...sidekick(sidekickLookup)}
          onKeyDown={onKeyDown}
          onClick={onNavItemClick}
          icon={!!subNavigation?.length ? 'chevron' : null}
          open={open}
          legacyBehavior={true}
          __typename="Link"
        />

        {!!subNavigation?.length ? (
          <NavItemSubMenuWrapper open={open}>
            <NavItemSubMenu>
              {subNavigation?.map((item: any, index: number) => (
                <NavItemSubMenuItem key={`${navItemId}-nav-item-${item.id}-${index}`}>
                  <NavItemGroup
                    {...item}
                    variant="headerGroup"
                    __typename="NavigationItem"
                    legacyBehavior={true}
                    onClick={onSubNavItemClick}
                    onRequestClose={onRequestClose}
                  />
                </NavItemSubMenuItem>
              ))}
            </NavItemSubMenu>
          </NavItemSubMenuWrapper>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' && prop !== 'onRequestClose' && prop !== 'menuBreakpoint';

const Root = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ open?: boolean }>``;

const NavItemSubMenuWrapper = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenuWrapper',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.navItemSubMenuWrapper]
})<{ open?: boolean }>``;

const NavItemSubMenu = styled(List, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenu',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{}>``;

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemLink',
  shouldForwardProp: (prop: string) => prop !== 'open',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ open?: boolean }>``;

const NavItemGroup = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemGroup',
  overridesResolver: (_, styles) => [styles.navItemGroup]
})<{}>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{}>``;

export default HeaderNavLink;
