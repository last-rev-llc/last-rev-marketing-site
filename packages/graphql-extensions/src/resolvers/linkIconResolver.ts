import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

const linkIconResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const variant: any = getLocalizedField(item.fields, 'variant', ctx);
  const icon: any = getLocalizedField(item.fields, 'icon', ctx);
  if (variant === 'CTA 1') return 'chevron';
  if (variant === 'CTA 2') return null;
  if (variant === 'CTA 3') return 'arrow-right';
  if (variant === 'CTA 4') return 'angled-arrow';
  if (variant === 'CTA 5') return 'arrow-right';
  if (variant === 'CTA Module') return 'chevron';
  return icon;
};

export default linkIconResolver;
