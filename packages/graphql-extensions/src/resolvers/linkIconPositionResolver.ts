import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

const linkIconPositionResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const variant: any = getLocalizedField(item.fields, 'variant', ctx);
  const iconPosition: any = getLocalizedField(item.fields, 'iconPosition', ctx);
  if (variant === 'CTA 1') return 'right';
  if (variant === 'CTA 2') return null;
  if (variant === 'CTA 3') return 'right';
  if (variant === 'CTA 4') return 'right';
  if (variant === 'CTA 5') return 'right';
  if (variant === 'CTA Module') return 'right';
  return iconPosition;
};

export default linkIconPositionResolver;
