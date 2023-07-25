Document how the provided React file functions as part of a larger application.
"""
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