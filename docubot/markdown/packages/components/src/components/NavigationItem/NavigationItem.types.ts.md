Summary:
This file exports an interface and a type for NavigationItemProps and NavigationItemClasses respectively. It also exports a constant accordionClasses which is of type NavigationItemClasses.

Import statements:
- LinkProps from '../Link': This imports the LinkProps interface from the '../Link' file.

Script Summary:
- NavigationItemProps: This interface extends the LinkProps interface and adds two optional properties: subNavigation and sidekickLookup. It also adds an optional function property onRequestClose.
- NavigationItemClasses: This interface defines two properties, root and menuRoot, which are strings representing CSS classes.
- NavigationItemClassKey: This is a type that is a union of the keys of the NavigationItemClasses interface.
- accordionClasses: This is a constant of type NavigationItemClasses that exports the root and menuRoot classes.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file does not have any direct interaction with the rest of the application. It only exports interfaces and a constant that can be used by other components.

Developer Questions:
- What is the purpose of the subNavigation and sidekickLookup properties in the NavigationItemProps interface?
- What is the expected behavior of the onRequestClose function property in the NavigationItemProps interface?
- How are the root and menuRoot classes defined in the NavigationItemClasses interface used in the application?
- Are there any other components that depend on the NavigationItemProps interface or the accordionClasses constant?
- Is there a reason why the NavigationItemClassKey type is defined as a union of the keys of the NavigationItemClasses interface instead of just using the string type directly?
- Are there any plans to add more properties or methods to the NavigationItemProps interface in the future?

Known Issues/Bugs:
- None

Todo:
- None