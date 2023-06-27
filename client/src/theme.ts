export const tokens = {
  grey: {
    100: '#f0f0f3',
    200: '#e1e2e7',
    300: '#d1d3da',
    400: '#c2c5ce',
    500: '#b3b6c2',
    600: '#8f929b',
    700: '#6b6d74',
    800: '#48494e',
    900: '#242427',
  },
  primary: {
    // Outrageous Orange
    100: '#FFDDD6',
    200: '#FFBCAD',
    300: '#FF9A85',
    400: '#FF795C',
    500: '#FF5733',
    600: '#FA2C00',
    700: '#C22200',
    800: '#8A1800',
    900: '#520E00',
  },
  secondary: {
    // Blue
    100: '#80EAF8',
    200: '#5ADFF5',
    300: '#33D2F3',
    400: '#0EC2EF',
    500: '#0C9EC9',
    600: '#0A7BA2',
    700: '#075A7C',
    800: '#053C55',
    900: '#043047',
  },
  tertiary: {
    // purple
    500: '#8884d8',
  },
  background: {
    light: '#2d2d34',
    main: '#1f2026',
  },
}

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 32,
    },
    h2: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 24,
    },
    h3: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
}
