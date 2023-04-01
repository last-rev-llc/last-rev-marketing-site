import React from 'react';
import { InlineWidget } from 'react-calendly';

declare type Optional<T extends object> = {
  [P in keyof T]?: T[P];
};

export interface CalendlyInlineWidgetProps {
  settings: {
    url: string;
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
  return <InlineWidget {...settings} />;
}

export default CalendlyInlineWidget;
