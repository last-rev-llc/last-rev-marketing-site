import * as React from 'react';
import { capitalize } from 'lodash';
import * as NextRouter from 'next/router';
import mount from '../../../cypress/mount';
import Link from './Link';
import { LinkProps } from './Link.types';
import mockContent from './Link.mock';

beforeEach(() => {
  cy.stub(NextRouter, 'useRouter').returns({});
});

let mockedContent: LinkProps = {};
const alignmentTypes: ('right' | 'left' | 'inherit' | 'center' | 'justify')[] = [
  'right',
  'left',
  'inherit',
  'center',
  'justify'
];
const underlineTypes: ('none' | 'hover' | 'always')[] = ['none', 'hover', 'always'];

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

const testAlignTypes = (linkType: 'button' | 'link') => {
  alignmentTypes.forEach((alignment) => {
    it(`renders a ${linkType} with ${alignment} alignment when align is ${alignment}`, () => {
      if (linkType === 'link') {
        mount(<Link {...mockedContent} variant="link" align={alignment} />);
        if (alignment !== 'inherit') {
          cy.get('a').should('have.class', `MuiTypography-align${capitalize(alignment)}`);
        } else {
          cy.get('a').should('not.have.class', 'MuiTypography-align*');
        }
      } else {
        mount(<Link {...mockedContent} align={alignment} />);
        cy.get('a button').should('have.attr', 'align', alignment);
      }
    });
  });
};

const testUnderlineTypes = (linkType: 'button' | 'link') => {
  underlineTypes.forEach((underline) => {
    it(`renders a ${linkType} with ${underline} underline class when underline is ${underline}`, () => {
      if (linkType === 'link') {
        mount(<Link {...mockedContent} variant="link" underline={underline} />);
        cy.get('a').should('have.class', `MuiLink-underline${capitalize(underline)}`);
      } else {
        mount(<Link {...mockedContent} underline={underline} />);
        cy.get('a button').should('have.attr', 'underline', underline);
      }
    });
  });
};

describe('Link', () => {
  context('renders correctly', () => {
    describe('variant attribute', () => {
      it('renders a basic link when variant is link', () => {
        mount(<Link {...mockedContent} variant="link" />);
        cy.get('a').should('exist').and('have.attr', 'href', mockedContent.href).and('have.text', mockedContent.text);
      });

      it('renders a basic link when variant is not provided', () => {
        mount(<Link {...mockedContent} variant="" />);
        cy.get('a').should('exist').and('have.attr', 'href', mockedContent.href).and('have.text', mockedContent.text);
      });

      it('renders a contained button when variant is button-contained', () => {
        mount(<Link {...mockedContent} variant="button-contained" />);
        cy.get('a button')
          .should('exist')
          .and('have.class', 'MuiButton-contained')
          .and('have.text', mockedContent.text);
      });

      it('renders an outlined button when variant is button-outlined', () => {
        mount(<Link {...mockedContent} variant="button-outlined" />);
        cy.get('a button').should('exist').and('have.class', 'MuiButton-outlined').and('have.text', mockedContent.text);
      });

      it('renders text as a button when variant is button-text', () => {
        mount(<Link {...mockedContent} variant="button-text" />);
        cy.get('a button').should('exist').and('have.class', 'MuiButton-text').and('have.text', mockedContent.text);
      });
    });

    describe('type attribute', () => {
      it('renders a link of type button when type is button', () => {
        mount(<Link {...mockedContent} type="button" />);
        cy.get('[type=button]').should('exist').and('have.text', mockedContent.text);
      });

      it('renders a link of type submit when type is submit', () => {
        mount(<Link {...mockedContent} type="submit" />);
        cy.get('[type=submit]').should('exist').and('have.text', mockedContent.text);
      });

      it('renders a link of type reset when type is reset', () => {
        mount(<Link {...mockedContent} type="reset" />);
        cy.get('[type=reset]').should('exist').and('have.text', mockedContent.text);
      });
    });

    describe('icon attribute', () => {
      it('renders a link without an icon if one is not provided', () => {
        mount(<Link {...mockedContent} icon={undefined} />);
        cy.get('.MuiIcon-root').should('not.exist');
      });

      it('renders a link with an icon on the right if iconPosition is Right', () => {
        mount(<Link {...mockedContent} iconPosition="Right" />);
        cy.get('.MuiButton-endIcon').should('exist');
      });

      it('renders a link with an icon on the left if iconPosition is Left', () => {
        mount(<Link {...mockedContent} iconPosition="Left" />);
        cy.get('.MuiButton-startIcon').should('exist');
      });
    });

    describe('size attribute when variant starts with button-', () => {
      it('renders a small button when size is small', () => {
        mount(<Link {...mockedContent} size="small" />);
        cy.get('a button').should('have.class', 'MuiButton-sizeSmall');
      });

      it('renders a medium button when size is medium', () => {
        mount(<Link {...mockedContent} size="medium" />);
        cy.get('a button').should('have.class', 'MuiButton-sizeMedium');
      });

      it('renders a large button when size is large', () => {
        mount(<Link {...mockedContent} size="large" />);
        cy.get('a button').should('have.class', 'MuiButton-sizeLarge');
      });
    });

    describe('underline attribute', () => {
      context('when link is a button', () => {
        testUnderlineTypes('button');
      });

      context('when link is not a button', () => {
        testUnderlineTypes('link');
      });
    });

    describe('align attribute', () => {
      context('when link is a button', () => {
        testAlignTypes('button');
      });

      context('when link is not a button', () => {
        testAlignTypes('link');
      });
    });
  });
});
