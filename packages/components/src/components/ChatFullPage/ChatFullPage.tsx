import React from 'react';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { FullPageChat } from 'aai-embed-react';

export interface ChatFullPageProps {
  settings: {
    chatflowId: string;
    apiHost: string;
    other: any;
    theme?: any;
  };
}

function ChatFullPage({ settings }: ChatFullPageProps) {
  const { chatflowid, apiHost, other } = settings;
  if (!chatflowid || !apiHost) return null;

  return (
    <Root>
      <FullPageChat isFullPage={false} chatflowid={chatflowid} apiHost={apiHost} {...other} />
    </Root>
  );
}

const Root = styled(Box, {
  name: 'ChatFullPage',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})``;
export default ChatFullPage;
