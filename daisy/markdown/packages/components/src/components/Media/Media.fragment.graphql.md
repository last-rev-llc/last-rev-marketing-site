fragment Media_BaseFragment on Media {
  # ...Content_BaseFragment
  id
  __typename
  title
  variant
  file {
    url
    extension
    fileName
    width
    height
    #svgContent
  }
}
