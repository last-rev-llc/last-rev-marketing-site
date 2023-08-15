import React from 'react';
import Hero, { HeroProps } from '@last-rev/component-library/dist/components/Hero/Hero';
import heroMock, { featuredImageMock } from './Hero.mock';

export default {
  title: 'Modules / Hero',
  component: Hero,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => storyFn()],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'inline-radio',
        options: ['centered', 'featured-image']
      },
      table: {
        defaultValue: { summary: 'centered' }
      }
    },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    image: { name: 'Image' },
    background: { name: 'Background' },
    backgroundColor: { name: 'Background Color' },
    actions: { name: 'Actions' },
    contentWidth: { name: 'Content Width' },
    contentHeight: {
      name: 'Content Height',
      control: {
        type: 'inline-radio',
        options: { Small: 'sm', Medium: 'md', Large: 'lg' }
      },
      table: {
        defaultValue: { summary: 'lg' }
      }
    },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: HeroProps) => <Hero {...args} />;

export const Centered = Template.bind({});
Centered.args = { ...heroMock };

export const FeaturedImage = Template.bind({});
FeaturedImage.args = { ...featuredImageMock };
