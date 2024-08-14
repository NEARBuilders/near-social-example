// theme.js
export const theme = {
    colors: {
      primary: {
        softBlue: '#A7C7E7',
        lavender: '#C8A2C8',
      },
      secondary: {
        white: '#FFFFFF',
        lightGray: '#F5F5F5',
        darkGray: '#333333',
      },
      accent: {
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
      },
    },
    typography: {
      primaryFont: 'Arial, sans-serif',
      secondaryFont: 'Georgia, serif',
      sizes: {
        h1: '32px',
        h2: '24px',
        h3: '18px',
        body: '16px',
        small: '14px',
      },
    },
    buttons: {
      primary: {
        background: `linear-gradient(to right, #A7C7E7, #C8A2C8)`,
        color: '#FFFFFF',
        hoverBackground: `linear-gradient(to right, #96B6D6, #B791B7)`,
        activeBackground: `linear-gradient(to right, #85A5C5, #A680A6)`,
      },
      secondary: {
        background: '#FFFFFF',
        border: '1px solid #A7C7E7',
        color: '#A7C7E7',
        hoverBackground: '#F5F5F5',
        activeBackground: '#A7C7E7',
        activeColor: '#FFFFFF',
      },
    },
    spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
  };