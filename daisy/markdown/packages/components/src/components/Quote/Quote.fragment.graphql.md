fragment Quote_BaseFragment on Quote {
  ...Content_BaseFragment
  variant
  quote
  authorName
  authorTitle
  authorImage {
    ...Media_BaseFragment
  }
  logo {
    ...Media_BaseFragment
  }
  actions {
    ...Link_BaseFragment
  }
}
