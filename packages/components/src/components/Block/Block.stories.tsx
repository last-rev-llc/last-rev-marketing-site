import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StoryWrapper from '../StoryWrapper';
import Block from './Block';
import blockMock, {
  blockMockMediaLeftTextRightVariant,
  blockMockTextLeftMediaRightVariant,
  blockMockStackedVariant,
  blockMockStackedThreePerRowVariant,
  blockMockQuoteVariant
} from './Block.mock';

export default {
  title: '1. LR Components / Block',
  component: Block,
  argTypes: {
    colorscheme: {
      name: 'Color Scheme',
      control: {
        type: 'select',
        options: ['default', 'black', 'green', 'blue']
      },
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    titleColor: {
      name: 'Title Color',
      control: {
        type: 'select',
        options: ['default', 'black', 'white', 'yellow', '']
      },
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    variant: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const BlockBgColors = {
  'White': 'background.default',
  'Parchment': 'active.parchment',
  'Charcoal': 'background.charcoal',
  'Black': 'active.black',
  'Red': 'active.red',
  'Green': 'active.green',
  'Blue': 'active.blue',
  'Ocean': 'background.ocean',
  'Turquoise': 'background.turquoise',
  'BG Blue': 'background.blue',
  'None': 'transparent'
};

// Variant: Default
const TemplateDefault = (args: JSX.IntrinsicAttributes) => (
  <>
    <Box sx={{ backgroundColor: '#999', pb: 4, px: 2, pt: 2 }}>
      <Typography variant="body1" sx={{ color: 'white', backgroundColor: '#444', p: 2 }}>
        <b>Background Image</b>
      </Typography>
      <Block
        {...args}
        backgroundColor="active.blue"
        backgroundImage={{
          file: {
            url: 'https://images.ctfassets.net/o2pgk9gufvga/88iK0iZVhpgbyncQ6ZkQD/b589d0398c44fc88e9a2486359201638/Coalition_BubbleBackground.svg'
          }
        }}
        titleColor="white"
        colorscheme="blue"
      />
    </Box>
    {Object.entries(BlockBgColors).map((color) => (
      <StoryWrapper title="Background Color" color={color[0]}>
        <Block {...args} backgroundColor={color[1]} variant="default" />
      </StoryWrapper>
    ))}
  </>
);

export const Default = TemplateDefault.bind({});
Default.args = { ...blockMock() };

// Variant: Media Left - Text Right
const TemplateMediaLeftTextRight = (args: JSX.IntrinsicAttributes) => (
  <>
    {Object.entries(BlockBgColors).map((color) => (
      <StoryWrapper title="Background Color" color={color[0]}>
        <Block {...args} backgroundColor={color[1]} variant="mediaOnLeft" isMainModule cols={12} />
      </StoryWrapper>
    ))}
  </>
);

export const MediaLeftTextRight = TemplateMediaLeftTextRight.bind({});
MediaLeftTextRight.args = { ...blockMockMediaLeftTextRightVariant() };

// Variant: Text Left - Media Right
const TemplateTextLeftMediaRight = (args: JSX.IntrinsicAttributes) => (
  <>
    {Object.entries(BlockBgColors).map((color) => (
      <StoryWrapper title="Background Color" color={color[0]}>
        <Block {...args} backgroundColor={color[1]} variant="mediaOnRight" />
      </StoryWrapper>
    ))}
  </>
);

export const TextLeftMediaRight = TemplateTextLeftMediaRight.bind({});
TextLeftMediaRight.args = { ...blockMockTextLeftMediaRightVariant() };

// Variant: Stacked
const TemplateStacked = (args: JSX.IntrinsicAttributes) => (
  <>
    <Box sx={{ backgroundColor: '#999', pb: 4, px: 2, pt: 2 }}>
      <Typography variant="body1" sx={{ color: 'white', backgroundColor: '#444', p: 2 }}>
        <b>Background Image</b>
      </Typography>
      <Block
        {...args}
        backgroundColor="transparent"
        backgroundImage={{
          file: {
            url: 'https://images.ctfassets.net/o2pgk9gufvga/4R7IrSEzfN1yD1dyu3Zb5q/c0fef69284a24f606f1197e7eb7ccb72/ActiveMonitoring_BG2.svg'
          }
        }}
        titleColor="white"
        colorscheme="green"
      />
    </Box>
    {Object.entries(BlockBgColors).map((color) => (
      <StoryWrapper title="Background Color" color={color[0]}>
        <Block {...args} backgroundColor={color[1]} variant="stacked" />
      </StoryWrapper>
    ))}
  </>
);

export const Stacked = TemplateStacked.bind({});
Stacked.args = { ...blockMockStackedVariant() };

// Variant: Stacked - Three Per Row
const TemplateStackedThreePerRow = (args: JSX.IntrinsicAttributes) => (
  <>
    {Object.entries(BlockBgColors).map((color) => (
      <StoryWrapper title="Background Color" color={color[0]}>
        <Block {...args} backgroundColor={color[1]} variant="stackedThreePerRow" />
      </StoryWrapper>
    ))}
  </>
);

export const StackedThreePerRow = TemplateStackedThreePerRow.bind({});
StackedThreePerRow.args = { ...blockMockStackedThreePerRowVariant() };

// Variant: Quote
const TemplateQuote = (args: JSX.IntrinsicAttributes) => (
  <>
    <Box sx={{ backgroundColor: '#999', pb: 4, px: 2, pt: 2 }}>
      <Typography variant="body1" sx={{ color: 'white', backgroundColor: '#444', p: 2 }}>
        <b>Background Image</b>
      </Typography>
      <Block
        {...args}
        backgroundColor="active.black"
        backgroundImage={{
          file: {
            url: 'https://images.ctfassets.net/o2pgk9gufvga/7iXV8OtMQBF40VFZlK4ucN/9d306ad7905af753c731f2f1db5a0915/Joshua_background.png'
          }
        }}
        titleColor="white"
        colorscheme="black"
        isMainModule
        cols={12}
      />
    </Box>
    {Object.entries(BlockBgColors).map((color) => (
      <StoryWrapper title="Background Color" color={color[0]}>
        <Block {...args} backgroundColor={color[1]} variant="quote" isMainModule cols={12} />
      </StoryWrapper>
    ))}
  </>
);

export const Quote = TemplateQuote.bind({});
Quote.args = { ...blockMockQuoteVariant() };
