Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SEO from './SEO';
import mockContent from './SEO.mock';

export default {
  title: '1. LR Components / SEO',
  component: SEO,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Table
        sx={{
          'width': 600,
          'margin': 8,
          'backgroundColor': '#fafafa',
          '& th': {
            fontWeight: 'bold'
          }
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Title
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.title.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Keywords
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.keywords.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Description
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.description.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Canonical
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.canonical.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Robots
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.robots.value}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  ],
  argTypes: {}
};

const Template = (args: JSX.IntrinsicAttributes) => <SEO {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };

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