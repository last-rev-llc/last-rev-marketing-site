Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import { getSdk } from '@last-rev-marketing-site/graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';
import ContentPreview from '@last-rev-marketing-site/components/src/components/ContentPreview/ContentPreview';
import contentMapping from '@last-rev-marketing-site/components/src/contentMapping';
import useSWR from 'swr';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import { Box } from '@mui/material';

const fetchPreview = async (id: string, locale: string, environment: string) => {
  const previewGqlClient = new GraphQLClient(`/api/graphql?env=${environment}`);

  const sdk = getSdk(previewGqlClient);
  return sdk.Preview({ id, locale });
};
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

interface Action {
  type: 'OVERRIDE_VALUES' | 'REFRESH_CONTENT' | 'NAVIGATE_TO';
  payload: any;
}
export default function Preview({}: any) {
  const { query } = useRouter();
  const {
    environment,
    id,
    locale = 'en-US'
  } = query as {
    environment?: string;
    id: string;
    locale?: string;
  };

  const { data, error, mutate } = useSWR(id ? [id, locale, environment, 'preview', spaceId] : null, fetchPreview, {});
  const content = data?.data?.content;
  const isLoadingInitialData = !data && !error;

  const [override, setOverride] = React.useState<any>();
  React.useLayoutEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        const action: Action = event.data;

        if (action.type === 'OVERRIDE_VALUES') {
          setOverride(action.payload);
        }
        if (action.type === 'REFRESH_CONTENT') {
          mutate();
        }
        if (action.type === 'NAVIGATE_TO') {
          mutate();
        }
      },
      false
    );
  }, [mutate]);

  return (
    <Box sx={{ '*': { transition: '.2s ease-in-out' } }}>
      <ContentModuleProvider contentMapping={contentMapping}>
        <ContentPreview
          id={id}
          loading={isLoadingInitialData}
          content={{ ...content, ...override }}
          error={error}
          environment={environment as string}
          locale={locale as string}
          spaceId={spaceId as string}
          livePreview
        />
      </ContentModuleProvider>
    </Box>
  );
}

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