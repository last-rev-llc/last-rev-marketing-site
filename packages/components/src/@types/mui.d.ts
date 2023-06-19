import { Mixins } from '@mui/material/styles/createMixins';
import { TypographyStyle, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true; // adds the `xxl` breakpoint
  }
  interface Theme {
    mixins: Mixins;
  }

  interface TypographyVariants {
    bodyXSmall: TypographyStyle;
    bodySmall: TypographyStyle;
    bodyLarge: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    bodyXSmall?: TypographyStyle;
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
  }
}

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    gridContainer: (theme: Theme, options?: any) => CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyXSmall: true;
    bodySmall: true;
    bodyLarge: true;
  }
}
