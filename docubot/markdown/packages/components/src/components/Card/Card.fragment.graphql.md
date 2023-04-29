# README

## TODO Items
- None

## Known Issues
- None

## Code Description
This file contains three fragments related to a Card component. 

### Card_FieldsFragment
This fragment contains the fields of a Card component such as variant, theme, media, title, subtitle, actions, and link.

### Card_BaseFragment
This fragment is used as a base fragment for all Card components. It includes the Card_FieldsFragment and the body field which contains a RichText_BaseFragment.

### Card_RichTextFragment
This fragment is used specifically for the RichText embedded entries in a Card component. It includes the Card_FieldsFragment and the body field which contains a RichText_CardFragment.