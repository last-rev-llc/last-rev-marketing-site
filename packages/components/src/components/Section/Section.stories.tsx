import React from 'react';
import Section from '@last-rev/component-library/dist/components/Section/Section';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';
import { splitPanelMock } from './Section.mock';

export default {
  title: 'Modules / Section',
  component: Section,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => storyFn()],
  argTypes: {
    variant: { name: 'Variant' },
    background: { name: 'Background' },
    backgroundColor: { name: 'Background Color' },
    contents: { name: 'Contents' },
    contentAlignment: { name: 'Content Alignment' },
    contentDirection: { name: 'Content Direction' },
    contentSpacing: { name: 'Content Spacing' },
    contentWidth: { name: 'Content Width' },
    __typename: { table: { disable: true } },
    id: { table: { disable: true } }
  }
};

const Template = (args: any) => <ContentModule {...args} />;

export const SplitPanel = Template.bind({});
SplitPanel.args = { ...splitPanelMock };
