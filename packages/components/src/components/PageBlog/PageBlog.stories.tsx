import React from 'react';
import Blog from './PageBlog';
import mockContent from './PageBlog.mock';

export default {
  title: 'Modules / Blog',
  component: Blog,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => storyFn()],
  argTypes: {
    title: { name: 'Title' },
    slug: { name: 'Slug' },
    featuredMedia: { name: 'Featured Media' },
    author: { name: 'Author' },
    landingPageSummary: { name: 'Landing Page Summary' },
    body: { name: 'Body' },
    quote: { name: 'Quote' },
    topics: { name: 'Topics' },
    tags: { name: 'Tags' },
    relatedLinks: { name: 'Related Links' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Blog {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
