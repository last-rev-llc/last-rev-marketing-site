import React from 'react';
import GlobalFooter from './GlobalFooter';
import footerMock from './GlobalFooter.mock';

export default {
  title: 'Global / Footer',
  component: GlobalFooter,
  argTypes: {
    logo: { name: 'Logo' },
    logoUrl: { name: 'Logo URL' },
    navigationItems: { name: 'Navigation Items' },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <GlobalFooter sidekickLookup={{}} {...args} />;
export const Default = Template.bind({});
Default.args = { ...footerMock };
