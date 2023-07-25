Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import Box from '@mui/material/Box';
import Page from './Page';
import mockContent from './Page.mock';

export default {
  title: '1. LR Components / Page',
  component: Page,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['Page', 'button-contained', 'button-outlined', 'button-text']
      },
      table: {
        defaultValue: { summary: 'Page' }
      }
    },
    text: { name: 'Text' },
    href: { name: 'Href' },
    bgcolor: {
      name: 'Background Color',
      control: {
        type: 'select',
        options: ['yellow', 'orange', 'green']
      },
      table: {
        defaultValue: { summary: 'yellow' }
      }
    }
    // variantMapping: { name: 'Variant Mapping' },
    // ref: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Page __typename="Page" {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };

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