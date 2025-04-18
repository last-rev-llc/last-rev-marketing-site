# This will go 3 levels deep recursive
fragment Section_BaseFragment on Section {
  ...Section_BaseFieldsFragment
  introText {
    ...Text_IntroTextFragment
  }
  contents {
    ...ContentModule_SectionFragment
    ... on Section {
      ...Section_BaseFieldsFragment
      contents {
        ...ContentModule_SectionFragment
        ... on Section {
          ...Section_BaseFieldsFragment
          contents {
            ...ContentModule_SectionFragment
            ... on Section {
              ...Section_BaseFieldsFragment
            }
          }
        }
      }
    }
  }
}

fragment Section_BaseFieldsFragment on Section {
  ...Content_BaseFragment
  theme {
    id
    components
    typography
  }
  variant
  styles
  # Style fields
  backgroundColor
  contentWidth
  contentDirection
  contentSpacing
  theme {
    id
    components
    typography
  }
  background {
    ...Media_BaseFragment
  }
  #introText {
  #  ...Text_IntroTextFragment
  #}
}

# This will go 3 levels deep recursive
fragment Section_RichTextFragment on Section {
  ...Section_BaseFieldsFragment
  contents {
    ...Section_RichText_ContentModuleFragment
    ... on Section {
      ...Section_BaseFieldsFragment
      contents {
        ...Section_RichText_ContentModuleFragment
        ... on Section {
          ...Section_BaseFieldsFragment
          contents {
            ...Section_RichText_ContentModuleFragment
            ... on Section {
              ...Section_BaseFieldsFragment
            }
          }
        }
      }
    }
  }
}

fragment Section_RichText_ContentModuleFragment on Content {
  ...ContentModule_RichText_SectionFragment

  ... on Section {
    ...Section_BaseFieldsFragment
  }
}

fragment ContentModule_RichText_SectionFragment on Content {
  ...Content_BaseFragment
  ...Media_BaseFragment
  ...Quote_BaseFragment
  ...NavigationItem_BaseFragment
  ...Collection_RichTextFragment
  ...Card_RichTextFragment
  #...Text_RichTextFragment
  #...Section_BaseFragment
}
