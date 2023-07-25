Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import Box from '@mui/material/Box';
import NavigationBar from './NavigationBar';
import NavigationBarMock, { mockWithNavigationItems } from './NavigationBar.mock';

export default {
  title: '1. LR Components / NavigationBar',
  component: NavigationBar,
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
        options: [
          'NavigationBar-one-per-row',
          'NavigationBar-two-per-row',
          'NavigationBar-three-per-row',
          'NavigationBar-tiles'
        ]
      },
      table: {
        defaultValue: { summary: 'NavigationBar-three-per-row' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: ['standard', 'standard-round', 'media', 'profile-column', 'profile-row', 'profile-image', 'square']
      },
      table: {
        defaultValue: { summary: 'standard' }
      }
    },
    items: { name: 'Items' },
    background: { name: 'Background' },
    contentWidth: { name: 'Content Width' },
    theme: { name: 'Theme' }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <NavigationBar theme={{}} sidekickLookup="" {...args} />;
export const Default = Template.bind({});
Default.args = { ...NavigationBarMock() };

export const WithNavigationItems = Template.bind({});
WithNavigationItems.args = { ...mockWithNavigationItems() };

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