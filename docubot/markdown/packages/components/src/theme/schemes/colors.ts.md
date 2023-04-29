Summary:
This file exports an object containing color schemes for a website. It also defines a type for the color scheme object and a default color palette.

Import statements:
- `red` from `@mui/material/colors`: A third-party library for Material UI that provides pre-defined color palettes.

Script Summary:
- Defines a type `ColorScheme` for the color scheme object.
- Defines a default color palette object `defaultColors`.
- Defines a base color scheme object `baseScheme` that uses the default color palette.
- Defines two color scheme objects `white` and `black` that override some of the colors in the base scheme.
- Exports an object `colorSchemes` that contains the `white` and `black` color schemes.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file provides color schemes that can be used by other components in the application. The color schemes can be accessed by importing the `colorSchemes` object from this file.

Developer Questions:
- How can I add a new color scheme?
- How do I use the color schemes in my components?
- What is the format of the `ColorScheme` type?
- What is the purpose of the `createPaletteAccent` and `createScheme` properties in the `buildOptions` object? 
- What is the purpose of the `red` import from `@mui/material/colors`? 

Known Issues:
- None

Todo:
- Explore if the `backgroundDefault`, `backgroundLight`, `backgroundDark`, and `backgroundPaper` properties in the `baseScheme` object should use contrast text.