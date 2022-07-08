import { Palette as MuiPalette } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Theme {
    scheme?: string;
    createSchemeTheme?: (scheme: string) => Theme;
    palette: Palette;
  }

  interface Palette {
    'gradient-primary'?: MuiPalette['primary'];
    'backgroundOption'?: MuiPalette['primary'];
  }

  interface PaletteOptions {
    'gradient-primary'?: PaletteOptions['primary'];
    'backgroundOption'?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
    body: React.CSSProperties;
    heading: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body?: React.CSSProperties;
    heading?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body: true;
    heading: true;
  }
}
