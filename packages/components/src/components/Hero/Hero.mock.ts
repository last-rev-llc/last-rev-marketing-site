import mockLink from '../Link/Link.mock';

const heroBase = {
  __typename: 'Hero',
  title: 'Building the Modern Web',
  subtitle: null,
  image: null,
  contentWidth: 'xl',
  contentHeight: 'lg',
  actions: [{ ...mockLink }],
  background: null,
  backgroundColor: 'primary.main',
  body: {
    id: null,
    __typename: 'RichText',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                'We build custom no-code solutions that enable non-technical users to take action on more connected data by quickly launching products and campaigns on more devices.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  }
};

export const heroMock = {
  ...heroBase,
  variant: 'centered',
  background: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: 'Hero background'
  }
};

export const featuredImageMock = {
  ...heroBase,
  variant: 'featured-image',
  image: {
    __typename: 'Media',
    file: {
      url: 'https://images.ctfassets.net/imglmb3xms7o/1LJc7yiUjwgrHh9i52XnV7/266b378620624792e5c4b4d11e5ebf84/Asset_1.svg'
    },
    alt: 'Featured image'
  }
};

export default heroMock;
