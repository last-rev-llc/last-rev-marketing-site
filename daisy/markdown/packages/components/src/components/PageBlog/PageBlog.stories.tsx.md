import React from 'react';
import PageBlog from './PageBlog';
import mockContent from './PageBlog.mock';

export default {
  title: 'Modules / PageBlog',
  component: PageBlog,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => storyFn()],
  argTypes: {
    title: { name: 'Title' },
    slug: { name: 'Slug' },
    featuredMedia: { name: 'Featured Media' },
    author: { name: 'Author' },
    createdDate: { name: 'Created Date' },
    landingPageSummary: { name: 'Landing Page Summary' },
    body: { name: 'Body' },
    quote: { name: 'Quote' },
    tags: { name: 'Tags' },
    relatedLinks: { name: 'Related Links' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <PageBlog {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
