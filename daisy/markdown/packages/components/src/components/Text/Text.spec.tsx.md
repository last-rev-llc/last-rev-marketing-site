import * as React from 'react';
import { each } from 'lodash';
import { BLOCKS } from '@contentful/rich-text-types';
import mount from '../../../cypress/mount';
import { TextProps } from './Text.types';
import Text from './Text';
import * as Router from 'next/router';

import mockContent, {
  formattedMock,
  dynamicMock,
  valueNode,
  contentNode,
  embeddedEntryInlineNode,
  embeddedEntryBlockNode,
  embeddedAssetBlockNode,
  hyperlinkNode,
  withLinksMock
} from './Text.mock';
import { assetMock } from '../Media/Media.mock';
import linkMock from '../Link/Link.mock';

const variantNodeTypeMapper = {
  [BLOCKS.PARAGRAPH]: 'body1',
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6'
};

const createTextMock = (nodeType: string) => dynamicMock([contentNode([valueNode()], nodeType)]);

const testNodeType = (variant: string, nodeType: string) => {
  it(`renders correct text in a ${variant} when nodeType is ${nodeType}`, () => {
    const testNode: TextProps = { ...createTextMock(nodeType) };
    mount(<Text {...testNode} />);
    cy.get(`[data-testid=Text-${variant}]`).each((body, index) => {
      cy.wrap(body).should(
        'have.text',
        testNode?.body?.json.content.filter((c: any) => c.nodeType === nodeType)[index].content[0].value
      );
    });
  });
};

describe('Text', () => {
  let router;

  // stub next/image:

  beforeEach(() => {
    router = {
      back: cy.stub().as('routerBack')
    };

    //mock next/image below

    cy.intercept;

    cy.stub(Router, 'useRouter').returns(router);
  });
  context('renders correctly', () => {
    it('renders text with correct information', () => {
      const mockedContent: TextProps = mockContent();
      mount(<Text {...mockedContent} />);
      cy.get('[data-testid=Text-root]').should(
        'have.text',
        mockedContent?.body?.json.content.map((c: any) => c.content[0].value).join('')
      );
      cy.percySnapshot();
    });

    it('renders formatted text with correct information', () => {
      const mockedContent: TextProps = formattedMock();
      mount(<Text {...mockedContent} />);

      cy.percySnapshot();
    });

    describe('node types', () => {
      context('text node types', () => {
        each(variantNodeTypeMapper, (variant, nodeType) => testNodeType(variant, nodeType));
      });

      context('other node types', () => {
        it('renders text with embedded inline entry', () => {
          const mockedEntry = linkMock();
          const mockedContent: TextProps = dynamicMock(
            [contentNode([embeddedEntryInlineNode(mockedEntry.id!)])],
            [mockedEntry]
          );
          mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-entry-inline]').contains(mockedEntry.text!).should('exist');
          cy.percySnapshot();
        });

        it('renders text with embedded entry block', () => {
          const mockedEntry = linkMock();
          const mockedContent: TextProps = dynamicMock([embeddedEntryBlockNode(mockedEntry.id!)], [mockedEntry]);
          mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-entry-block]').contains(mockedEntry.text!).should('exist');
          cy.percySnapshot();
        });

        it('renders text with embedded asset block', () => {
          const mockedMedia = assetMock();
          const mockedContent: TextProps = dynamicMock([embeddedAssetBlockNode(mockedMedia.id!)], [], [mockedMedia]);
          // console.log(mockedContent);
          mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-asset-block]')
            .should('exist')
            .and('have.attr', 'src', `/_next/image/?url=${encodeURIComponent(mockedMedia.file?.url)}&w=1200&q=75`);
          cy.percySnapshot();
        });

        it('renders text with hyperlink', () => {
          const mockedLink = linkMock();
          const mockedContent: TextProps = dynamicMock([hyperlinkNode(mockedLink.text!, mockedLink.href!)]);
          mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-hyperlink]').contains(mockedLink.text!).should('exist');
          cy.percySnapshot();
        });

        it('renders formatted text with hyperlink', () => {
          const mockedContent: TextProps = withLinksMock();
          mount(<Text {...mockedContent} />);
          cy.percySnapshot();
        });
      });
    });
  });
});
