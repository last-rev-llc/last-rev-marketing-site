import React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export interface ChatProps {
  settings: {
    chatflowid: string;
    apiHost: string;
    other: any;
    theme?: any;
  };
}

function Chat({ settings }: ChatProps) {
  const { chatflowid, apiHost, other } = settings;

  if (!chatflowid || !apiHost) return null;

  return (
    <Root>
      <BubbleChat chatflowid={chatflowid} apiHost={apiHost} {...other} />
    </Root>
  );
}

const Root = styled(Box, {
  name: 'Chat',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})``;

export default Chat;
3;
