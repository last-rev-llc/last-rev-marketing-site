<!-- Text.stories.mdx -->

import { Canvas, Meta, Story, ArgsTable } from '@storybook/addon-docs';

import Text from './Text';
import { TextClasses } from './Text.types';
import textMock, { baseMock, complexMock, formattedMock } from './Text.mock';

<Meta
  title="Components / Text"
  component={Text}
  parameters={{
    viewMode: 'docs'
  }}
  argTypes={{
    variant: {
      options: []
    },
    align: {
      options: ['left', 'center', 'right'],
      defaultValue: 'left'
    },
    __typename: { table: { disable: true } },
    id: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    styles: { table: { disable: true } },
    renderNode: { table: { disable: true } }
  }}
/>

export const Template = (args) => <Text {...args} />;

# Text

The Text component is the main way to communicate with your audience.
It's displayed on the page in a variety of ways, including in titles, subtitles, and paragraphs.

<Canvas>
  <Story name="base" args={baseMock()} />
</Canvas>

## Props

<ArgsTable story="base" />

## Stories

### Text

<Canvas>
  <Story name="text" args={textMock()} />
</Canvas>

### Complex Text

<Canvas>
  <Story name="complex" args={complexMock()} />
</Canvas>

### Formatted Text

<Canvas>
  <Story name="formatted" args={formattedMock()} />
</Canvas>
