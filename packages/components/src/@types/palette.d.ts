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
}
