fragment Footer_BaseFragment on Footer {
  ...Content_BaseFragment
  variant
  logo {
    ...Media_BaseFragment
  }
  logoUrl
  brandAndYear
  navigationItems {
    ...Collection_BaseFragment
  }
}
