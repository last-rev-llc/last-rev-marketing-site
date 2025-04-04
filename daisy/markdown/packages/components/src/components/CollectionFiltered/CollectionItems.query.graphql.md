query CollectionItems(
  $locale: String
  $preview: Boolean
  $id: String!
  $limit: Int = 10
  $offset: Int = 0
  $filter: CollectionFilterInput
) {
  content(id: $id, locale: $locale, preview: $preview) {
    __typename
    id
    ... on Collection {
      ...Content_BaseFragment
      itemsConnection(limit: $limit, offset: $offset, filter: $filter) {
        pageInfo {
          allOptions {
            ...CollectionItems_OptionsFragment
          }
          options {
            ...CollectionItems_OptionsFragment
          }
        }
        items {
          ...Card_BaseFragment
          ...Link_BaseFragment
          ...NavigationItem_BaseFragment
          ...Media_BaseFragment
        }
      }
    }
  }
}

fragment CollectionItems_OptionsFragment on CollectionOptions {
  __typename
  # Collection options that get exposed to the UI
  # These are the same as the options in the Collection extension
  # i.e
  topics {
    label
    value
  }
  tags {
    label
    value
  }
}
