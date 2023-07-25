Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import { InlineWidget } from 'react-calendly';
import { Box, styled } from '@mui/material';

declare type Optional<T extends object> = {
  [P in keyof T]?: T[P];
};

export interface CalendlyInlineWidgetProps {
  settings: {
    url: string;
    pageSettings?: Optional<{
      backgroundColor: string;
      hideEventTypeDetails: boolean;
      hideLandingPageDetails: boolean;
      primaryColor: string;
      textColor: string;
    }>;
    prefill?: Optional<{
      name: string;
      email: string;
      firstName: string;
      lastName: string;
      location: string;
      guests: string[];
      customAnswers: Optional<{
        a1: string;
        a2: string;
        a3: string;
        a4: string;
        a5: string;
        a6: string;
        a7: string;
        a8: string;
        a9: string;
        a10: string;
      }>;
      date: Date;
    }>;
    utm?: Optional<{
      utmCampaign: string;
      utmSource: string;
      utmMedium: string;
      utmContent: string;
      utmTerm: string;
      salesforce_uuid: string;
    }>;
  };
}

function CalendlyInlineWidget({ settings }: CalendlyInlineWidgetProps) {
  return (
    <Root>
      <InlineWidget {...settings} styles={{ height: 740 }} />
    </Root>
  );
}

const Root = styled(Box, {
  name: 'CalendlyInlineWidget',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})``;
export default CalendlyInlineWidget;

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