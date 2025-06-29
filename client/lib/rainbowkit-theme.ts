import { lightTheme, darkTheme } from '@rainbow-me/rainbowkit';

export const rainbowKitTheme = {
  ...lightTheme(),
  colors: {
    ...lightTheme().colors,
    accentColor: '#00d4aa', // Deeds3 brand color
    accentColorForeground: 'white',
    modalBackground: 'white',
    modalBorder: '#e7e7e7',
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
  },
  radii: {
    actionButton: '8px',
    connectButton: '8px',
    menuButton: '8px',
    modal: '16px',
    modalMobile: '16px',
  },
};

export const rainbowKitDarkTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: '#00d4aa',
    accentColorForeground: 'white',
  },
};
