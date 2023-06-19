import { ApolloContext } from '@last-rev/types';
// import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import getPathReader from '../utils/getPathReader';

const hrefUrlResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  if (item) {
    const path = await getPathReader(ctx)?.getPathsByContentId(item.sys.id, undefined, process.env.SITE);
    // TODO: Do we need to support more items?
    if (!!path?.length) return path[0];
  }
  return '#';
};

export default hrefUrlResolver;
