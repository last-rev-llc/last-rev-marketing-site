Summary:
This file contains mock data for the NavigationBar component, which is used in a larger application.

Import statements:
- mockNavigationItem from '../NavigationItem/NavigationItem.mock': imports mock data for the NavigationItem component
- NavigationBarProps from './NavigationBar': imports the NavigationBarProps interface from the NavigationBar component
- mockLink from '../Link/Link.mock': imports mock data for the Link component
- mockTheme from '../../theme': imports mock data for the application's theme

Script Summary:
- mockWithNavigationItems: returns mock data for the NavigationBar component with four NavigationItem components
- default: returns mock data for the NavigationBar component with four Link components

Internal Functions:
- mockWithNavigationItems: returns an object with NavigationBarProps properties, including a variant, an array of four NavigationItem components, an itemsVariant, and a sidekickLookup

External Functions:
- default: returns an object with NavigationBarProps properties, including a variant, an array of four Link components, an itemsVariant, and a sidekickLookup

Interaction Summary:
This file provides mock data for the NavigationBar component, which is used in a larger application. The mock data can be used for testing and development purposes.

Developer Questions:
- What is the purpose of the NavigationBar component in the larger application?
- How is the NavigationBar component used in other parts of the application?
- What is the purpose of the NavigationItem and Link components?
- How does the mock data in this file relate to the application's theme?