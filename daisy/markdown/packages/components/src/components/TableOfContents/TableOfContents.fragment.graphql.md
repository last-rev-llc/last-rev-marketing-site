fragment TableOfContents_BaseFragment on TableOfContents {
  ...Content_BaseFragment
  content {
    ... on Heading {
      level
      text
      id
    }
  }
}
