Document how the provided React file functions as part of a larger application.
"""
import * as React from 'react';
import mount from '../../../cypress/mount';
import Image from './Image';
import mockContent from './Image.mock';
import { ImageProps } from './Image.types';

let mockedContent: ImageProps = {};

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Image', () => {
  context('renders correctly', () => {
    it('renders an image', () => {
      mount(<Image {...mockedContent} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('exist').and('have.attr', 'src', mockedContent.src);
      cy.percySnapshot();
    });

    it('renders an image with correct class name given', () => {
      mount(<Image {...mockedContent} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.class', mockedContent.className);
    });

    it('renders an image without a class name given', () => {
      mount(<Image {...mockedContent} className={undefined} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('exist');
    });

    it('renders an image with correct itemprop given', () => {
      const itemProp = 'item-prop';
      mount(<Image {...mockedContent} itemProp={itemProp} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.attr', 'itemprop', itemProp);
    });

    it('renders an image with lazy loading when priority is false', () => {
      mount(<Image {...mockedContent} priority={false} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.attr', 'loading', 'lazy');
    });

    it('renders an image without lazy loading when priority is true', () => {
      mount(<Image {...mockedContent} priority />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.attr', 'loading', 'eager');
    });
  });
});

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