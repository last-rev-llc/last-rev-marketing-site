import React from 'react';
export type {
  CollectionFilteredProps,
  CollectionFilteredClassKey,
  CollectionFilteredClasses
} from '@last-rev/component-library/dist/components/CollectionFiltered';
import CollectionFiltered from '@last-rev/component-library/dist/components/CollectionFiltered';

const parseBooleanEnvVar = (value = '') => {
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW) || false;

const withFetchItems = (Wrapped: any) => (props: any) => {
  const fetchItems = async ({ filter, limit, offset }: { filter: any; limit?: number; offset?: number }) => {
    const client = await import('@last-rev-marketing-site/utils').then((module) => module.client);
    const { data } = await client.CollectionItems({ id: props.id, limit, offset, filter, preview });

    if (data?.content?.__typename == 'Collection') {
      const items = data?.content?.itemsConnection?.items;
      const options = data?.content?.itemsConnection?.pageInfo?.options;
      const allOptions = data?.content?.itemsConnection?.pageInfo?.allOptions;
      return { items, options, allOptions };
    }
    return null;
  };
  return (
    <div>
      <Wrapped fetchItems={fetchItems} loadMoreText={'VIEW MORE POSTS'} {...props} />
    </div>
  );
};

export default withFetchItems(CollectionFiltered);
