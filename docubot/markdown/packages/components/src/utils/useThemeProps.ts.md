Summary:
This file exports a custom hook called `useThemeProps` which takes in an object with `props`, `name`, and `defaultTheme` properties and returns merged props with default theme values. It also exports a helper function called `resolveProps` which merges default props with provided props.

Import statements:
This file imports two functions from the `@mui/system` package: `useTheme` and `ThemedProps`. It also imports two types from `@mui/system/useThemeProps`: `ThemedProps` and `ThemeWithProps`.

Script Summary:
This file exports a custom hook called `useThemeProps` which takes in an object with `props`, `name`, and `defaultTheme` properties and returns merged props with default theme values. It also exports a helper function called `resolveProps` which merges default props with provided props.

Internal Functions:
- `resolveProps`: This function takes in two objects, `defaultProps` and `props`, and returns a merged object. It loops through the keys of `defaultProps` and if the corresponding key in `props` is `undefined` or `null`, it sets it to the value of the corresponding key in `defaultProps`.

External Functions:
- `useThemeProps`: This is a custom hook that takes in an object with `props`, `name`, and `defaultTheme` properties and returns merged props with default theme values. It first calls the `useTheme` hook with the `defaultTheme` parameter. If the theme or the `name` component or its `defaultProps` are not defined in the theme, it returns the original `props`. Otherwise, it calls the `resolveProps` function with the `defaultProps` and `props` objects and returns the merged object.

Interaction Summary:
This file exports a custom hook that can be used in other components to merge default theme values with provided props. It interacts with the `useTheme` hook from the `@mui/system` package to get the current theme and its components.

Developer Questions:
- What is the structure of the `props` object that needs to be passed to the `useThemeProps` hook?
- What is the purpose of the `defaultTheme` parameter in the `useThemeProps` hook?
- How can I test the `useThemeProps` hook in isolation?
- What happens if the `name` component or its `defaultProps` are not defined in the theme?