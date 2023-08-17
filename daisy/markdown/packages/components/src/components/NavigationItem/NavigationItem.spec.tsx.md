import * as React from 'react';
import * as NextRouter from 'next/router';
import mount from '../../../cypress/mount';
import NavigationItem from './NavigationItem';
import { NavigationItemProps } from './NavigationItem.types';
import mockContent from './NavigationItem.mock';

let mockedContent: NavigationItemProps = {};

beforeEach(() => {
  mockedContent = { ...mockContent() };
  cy.stub(NextRouter, 'useRouter').returns({});
});

describe('NavigationItem', () => {
  context('renders correctly', () => {
    it('renders a navigation item and its subnav links', () => {
      mount(<NavigationItem {...mockedContent} />);
      const subNav = !!mockedContent?.subNavigation ? mockedContent?.subNavigation : [];
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', subNav.length + 1)
        .each((item, index) => {
          if (index !== 0) {
            cy.wrap(item)
              .should('have.attr', 'href', subNav[index - 1].href)
              .and('have.text', subNav[index - 1].text);
          } else {
            cy.wrap(item).should('have.attr', 'href', mockedContent.href).and('have.text', mockedContent.text);
          }
        });
      // cy.percySnapshot();
    });

    it('renders a navigation item without subnav links', () => {
      mount(<NavigationItem {...mockedContent} subNavigation={undefined} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', 1)
        .and('have.attr', 'href', mockedContent.href)
        .and('have.text', mockedContent.text);
    });
  });
});
