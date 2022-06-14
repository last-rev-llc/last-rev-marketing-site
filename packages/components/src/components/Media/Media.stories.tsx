import React from 'react';
import { Box } from '@mui/material';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import MediaProps from '@last-rev/component-library/dist/components/Media/Media';
import { mediaVideoMock } from './Media.mock';

export default {
  title: 'Modules / Media',
  component: Media,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ]
};

const Template = (args: typeof MediaProps) => <Media {...args} />;
export const Default = Template.bind({});
Default.args = { ...mediaVideoMock };
