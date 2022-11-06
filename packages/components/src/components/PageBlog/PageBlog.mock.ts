import { lorem, name } from 'faker';

export default {
  __typename: 'Blog',
  title: lorem.sentence(),
  slug: lorem.word(),
  featuredMedia: {
    __typename: 'Media',
    file: {
      url: 'https://images.ctfassets.net/m1b67l45sk9z/44WyHNg5cSOdPyTkVZoIOF/c8463ffc7e1482c5e740a342234983a6/Blog-image-detail.jpg'
    },
    alt: 'Girl deciding what to do',
  },
  author: name.findName(),
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
              value: lorem.sentences(3),
              marks: [],
              data: {}
            }
          ]
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: lorem.sentences(3),
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  quote: lorem.sentence(),
  topics: [
    {
      title: 'Mental Health',
      slug: 'mental-health'
    },
    {
      title: 'Depression',
      slug: 'depression'
    },
    {
      title: 'Happiness',
      slug: 'be-happy'
    },
  ],
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
  relatedLinks: [
    {
      __typename: 'Link',
      variant: 'text',
      href: lorem.word(),
      text: lorem.sentence(),
    },
    {
      __typename: 'Link',
      variant: 'text',
      href: lorem.word(),
      text: lorem.sentence(),
    },
  ]
};
