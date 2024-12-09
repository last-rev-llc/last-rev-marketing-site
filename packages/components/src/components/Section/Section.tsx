import React from 'react';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';

import useTheme from '@mui/system/useTheme';
import { Theme } from '@mui/system';
import Container from '@mui/material/Container';
import get from 'lodash/get';
// import omit from 'lodash/omit';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import sidekick from '@last-rev/contentful-sidekick-util';
import ConditionalWrapper from '../ConditionalWrapper';

import { SectionProps } from './Section.types';
import useThemeProps from '../../utils/useThemeProps';

const Section = (inProps: SectionProps) => {
  const theme = useTheme();
  const {
    introText,
    contents,
    styles,
    background,
    backgroundColor,
    contentWidth,
    contentDirection,
    contentSpacing,
    variant,
    testId,
    sidekickLookup,
    ...props
  } = useThemeProps({ name: 'Section', props: inProps });

  const ownerState = { styles, contentWidth, contentDirection, contentSpacing };

  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        data-testid={testId}
        sx={{
          ...styles?.root,
          ...rootStyles({ backgroundColor, theme })
        }}
        className="section-baseline"
        backgroundColor={backgroundColor}
        variant={variant}
        {...props}>
        {background ? <BackgroundMedia {...background} /> : null}

        {introText && (
          <IntroTextWrapper>
            <IntroText {...introText} {...sidekick(sidekickLookup, 'introText')} data-testid="Section-introText" />
          </IntroTextWrapper>
        )}

        <ConditionalWrapper
          condition={!!contentWidth}
          wrapper={(children) => <ContentContainer maxWidth={contentWidth}>{children}</ContentContainer>}>
          <GridWrapper>
            <GridContainer
              ownerState={ownerState}
              {...props}
              sx={{
                ...styles?.gridContainer
              }}>
              {contents
                ?.filter((content) => !!content)
                .map((content, idx) => {
                  const itemStyle = get(styles?.gridItems, idx);
                  return (
                    <GridItem
                      key={content.id}
                      sx={{
                        // ...styles?.gridItem,
                        ...itemStyle
                        // ...gridItemStyle
                      }}
                      data-testid="Section-ContentItem">
                      <ContentModule {...content} />
                    </GridItem>
                  );
                })}
            </GridContainer>
          </GridWrapper>
        </ConditionalWrapper>
      </Root>
    </ErrorBoundary>
  );
};

const rootStyles = ({ backgroundColor, theme }: { backgroundColor?: string; theme: Theme }) => {
  if (backgroundColor?.includes('gradient') && get(theme.palette, backgroundColor)) {
    return {
      background: get(theme.palette, backgroundColor)?.main,
      color: `${backgroundColor}.contrastText`
    };
  }
  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && get(theme.palette, parsedBGColor)) {
    return {
      bgcolor: parsedBGColor,
      color: `${paletteColor}.contrastText`
    };
  }
  return {};
};

// Define the pieces of the Section customizable through Theme

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; backgroundColor?: string }>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative'
}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(() => ({
  zIndex: 1
}));

const BackgroundMedia = styled(ContentModule, {
  name: 'Section',
  slot: 'BackgroundMedia',
  overridesResolver: (_, styles) => [styles.backgroundImage]
})(() => ({
  'zIndex': 0,
  'position': 'absolute',
  'top': 0,
  'left': 0,
  'width': '100%',
  'height': '100%',
  'display': 'block',

  '&': {
    objectFit: 'cover',
    minWidth: '100%',
    minHeight: '100%'
  }
}));

const GridContainer = styled(Box, {
  name: 'Section',
  slot: 'GridContainer',
  overridesResolver: (_, styles) => [styles.gridContainer]
})<{ ownerState?: any }>(() => ({
  zIndex: 1
}));

const GridItem = styled(Box, {
  name: 'Section',
  slot: 'GridItem',
  overridesResolver: (_, styles) => [styles.gridItem]
})(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Section',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})(() => ({}));

const GridWrapper = styled(Box, {
  name: 'Section',
  slot: 'GridWrapper',
  overridesResolver: (_, styles) => [styles.gridWrapper]
})(() => ({}));

const IntroTextWrapper = styled(Container, {
  name: 'Section',
  slot: 'IntroTextWrapper',
  overridesResolver: (_, styles) => [styles.introTextWrapper]
})(() => ({}));

export default Section;
