Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import Box from '@mui/material/Box';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Text from './Text';
import mockContent, { complexMock } from './Text.mock';

export default {
  title: '1. LR Components / Text',
  component: Text,
  argTypes: {
    variant: { name: 'Variant' },
    align: {
      name: 'Align',
      control: {
        type: 'inline-radio',
        options: ['left', 'right', 'center']
      },
      table: {
        defaultValue: { summary: 'left' }
      }
    },
    body: { name: 'Body' },
    __typename: { table: { disable: true } },
    id: { table: { disable: true } },
    styles: { table: { disable: true } },
    sx: { table: { disable: true } },
    renderNode: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template1 = (args: JSX.IntrinsicAttributes) => <Text body={undefined} {...args} />;
export const Plaintext = Template1.bind({});
Plaintext.args = { ...mockContent() };

const Template2 = (args: JSX.IntrinsicAttributes) => <Text body={undefined} {...args} />;
export const Formatted = Template2.bind({});
Formatted.args = {
  ...complexMock(),
  renderNode: {
    [BLOCKS.UL_LIST]: (_: any, children: any) => {
      return children.map((child: any) => (
        <Box component="li" display="flex" alignItems="center">
          <PlayCircleFilledRoundedIcon color="secondary" sx={{ marginRight: 1 }} fontSize="small" />
          {child}
        </Box>
      ));
    },
    [BLOCKS.LIST_ITEM]: (_: any, children: any) => {
      return children;
    }
  }
};

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