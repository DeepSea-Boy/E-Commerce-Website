import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2bbef9',
      light: '#6fe1ff',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ed174a',
      light: '#ff5c7a',
      dark: '#b8002d',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#2b3445',
      secondary: '#7d879c',
    },
    background: {
      default: '#fbfbfb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Lato", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(43, 190, 249, 0.25)',
          },
        },
      },
    },
  },
});
