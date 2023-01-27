import { lorem, name } from 'faker';

export default {
  __typename: 'Blog',
  title: lorem.sentence(),
  slug: lorem.word(),
  creationDate: '11/16/2022',
  featuredMedia: {
    id: '1582221879',
    __typename: 'Media',
    variant: 'image',
    file: {
      url: 'https://images.ctfassets.net/imglmb3xms7o/4R9tkVBEpEC2saknYD4ABd/49016df2f72d21991d760180e140f8d2/1000_F_297109823_5QTgSppLWNTYy0FOSe6AeRMicFwHFpbB.jpg'
    },
    title: 'Featured image'
  },
  author: name.findName(),
  landingPageSummary: lorem.paragraph(),
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
    }
  ],
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
  relatedLinks: [
    {
      __typename: 'Link',
      variant: 'text',
      href: lorem.word(),
      text: lorem.sentence()
    },
    {
      __typename: 'Link',
      variant: 'text',
      href: lorem.word(),
      text: lorem.sentence()
    }
  ]
};
