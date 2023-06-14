import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import createType from '../utils/createType';

const cardLinkResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const link = getLocalizedField(item.fields, 'link', ctx);

  if (link) {
    return link;
  }

  const actions = getLocalizedField(item.fields, 'actions', ctx);
  if (actions?.length === 1) {
    const manualUrl = getLocalizedField(actions[0].fields, 'manualUrl', ctx);

    return createType('link', {
      manualUrl
    });
  }
};

export default cardLinkResolver;
