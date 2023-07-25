Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import Link from './Link';
import mockContent from './Link.mock';

export default {
  title: 'Components / Link',
  component: Link,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['link', 'button-contained', 'button-outlined', 'button-text', '']
      },
      table: {
        defaultValue: { summary: 'link' }
      }
    },
    text: { name: 'Text' },
    href: { name: 'Href' },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
        options: ['instagram', 'facebook', 'twitter', 'youtube', 'chevron-right', 'caret-right', '']
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    iconPosition: {
      name: 'Icon Position',
      control: {
        type: 'inline-radio',
        options: ['Left', 'Right']
      },
      table: {
        defaultValue: { summary: 'Right' }
      }
    },
    type: {
      name: 'Type',
      control: {
        type: 'inline-radio',
        options: ['button', 'submit', 'reset']
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Link __typename="Link" {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
export const ButtonContained = Template.bind({});
ButtonContained.args = { ...mockContent(), variant: 'button-contained' };
export const ButtonOutlined = Template.bind({});
ButtonOutlined.args = { ...mockContent(), variant: 'button-outlined' };
export const ButtonText = Template.bind({});
ButtonText.args = { ...mockContent(), variant: 'button-text' };
export const LinkText = Template.bind({});
LinkText.args = { ...mockContent(), variant: 'link' };

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