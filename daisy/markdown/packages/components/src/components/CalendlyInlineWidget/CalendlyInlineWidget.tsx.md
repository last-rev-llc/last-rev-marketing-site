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
