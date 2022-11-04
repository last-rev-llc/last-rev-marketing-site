import React from 'react';
import Blog from './BlogDetail';
import mockContent from './BlogDetail.mock';

export default {
  title: 'Modules / Blog',
  component: Blog,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => storyFn()],
  argTypes: {
    title: { name: 'Title' },
    slug: { name: 'Slug' },
    featuredMedia: { name: 'Featured Media' },
    author: { name: 'Author' },
    body: { name: 'Body' },
    quote: { name: 'Quote' },
    topics: { name: 'Topics' },
    tags: { name: 'Tags' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Blog {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
