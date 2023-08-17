fragment Topic_BaseFragment on Topic {
  ...Content_BaseFragment
  title
  seo
  slug
  header {
    ...ContentModule_BaseFragment
  }
  footer {
    ...ContentModule_BaseFragment
  }
  hero {
    ...ContentModule_BaseFragment
  }
  contents {
    ...ContentModule_BaseFragment
  }
}
