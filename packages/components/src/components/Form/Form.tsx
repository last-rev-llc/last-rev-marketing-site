import React from 'react';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Head from 'next/head';
import sidekick from '@last-rev/contentful-sidekick-util';

import { FormProps } from './Form.types';
import ContentModule from '../ContentModule';

// @ts-ignore
const HSForm = dynamic(() => import('react-hubspot-form'), { ssr: false });

const Form = ({ variant, portalId, formId, introText, successMessage, sidekickLookup }: FormProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const ownerState = { variant, submitted, hasSuccessMessage: !!successMessage?.json };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Root ownerState={ownerState}>
      <FormOuterContainer ownerState={ownerState}>
        <Head>
          <script async type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js" />
        </Head>
        {!!introText && (
          <IntroText
            {...sidekick(sidekickLookup, "introText")}
            __typename="Text"
            body={introText}
            variant={variant === 'hubspotFormFooter' ? variant : 'detailPageBody'}
            ownerState={ownerState}
          />
        )}
        {/* @ts-ignore */}
        <FormContainer ownerState={ownerState}>
          <HSForm
            //   @ts-ignore
            portalId={portalId}
            formId={formId}
            onSubmit={() => {
              /**
               * react-hubspot-form expects this callback to
               * be here and will throw an error if not found
               */
            }}
            onFormSubmitted={handleSubmit}
            inlineMessage={!!successMessage ? ' ' : undefined}
            loading={<CircularProgress />}
          />
        </FormContainer>
        {!!successMessage && submitted && (
          <SuccessMessage {...sidekick(sidekickLookup, "successText")} __typename="Text" body={successMessage} />
        )}
      </FormOuterContainer>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Form',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState?: any }>(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Form',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState?: any }>(() => ({}));

const FormOuterContainer = styled(Box, {
  name: 'Form',
  slot: 'FormOuterContainer',
  overridesResolver: (_, styles) => [styles.formOuterContainer]
})<{ ownerState?: any }>(() => ({}));

const FormContainer = styled(Box, {
  name: 'Form',
  slot: 'FormContainer',
  overridesResolver: (_, styles) => [styles.formContainer]
})(() => ({}));

const SuccessMessage = styled(ContentModule, {
  name: 'Form',
  slot: 'SuccessMessage',
  overridesResolver: (_, styles) => [styles.successMessage]
})(() => ({}));

export default Form;
