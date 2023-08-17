import mockLink from '../Link/Link.mock';

const cardBase = {
  __typename: 'Card',
  media: {
    __typename: 'Media',
    file: {
      url: 'https://images.ctfassets.net/imglmb3xms7o/1LJc7yiUjwgrHh9i52XnV7/266b378620624792e5c4b4d11e5ebf84/Asset_1.svg'
    },
    alt: 'Card image'
  },
  subtitle: null,
  actions: null
};

export const iconCenteredMock = {
  ...cardBase,
  variant: 'icon-centered',
  title: 'Web and Application Development',
  body: {
    __typename: 'Text',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                "We develop with tomorrow's standards in mind. Whether it's React, Gatsby, Next, or whatever's on the horizon, we'll make sure you're ready for the future.",
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
};

export const blogFeaturedMock = {
  ...cardBase,
  variant: 'blog-featured',
  title: 'Building your website through experimentation',
  body: {
    __typename: 'Text',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                "Historically, experimentation was only done by companies like Amazon, Google, and Facebook. In 2017, brands from across the globe use web experimentation to increase conversions, inform website design and find out what message resonates best with their customers. Brad will talk about Optimizely's experience migrating their major web properties over to Contentful and how they have baked experimentation into the content creation process.",
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  actions: [{ ...mockLink, text: 'Watch Now', variant: 'text' }]
};
