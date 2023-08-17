import React from 'react';
import Footer from './Footer';
import footerMock from './Footer.mock';

export default {
  title: 'Global / Footer',
  component: Footer,
  argTypes: {
    logo: { name: 'Logo' },
    logoUrl: { name: 'Logo URL' },
    navigationItems: { name: 'Navigation Items' },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Footer sidekickLookup={{}} {...args} />;
export const Default = Template.bind({});
Default.args = { ...footerMock };
