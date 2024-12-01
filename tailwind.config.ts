const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: true,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        radius: {
          small: "0.25rem",
          medium: "0.5rem",
          large: "0.75rem",
        },
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        disabledOpacity: "0.5",
        dividerWeight: "1px",
      },
      themes: {
        light: {
          layout: {
            boxShadow: {
              small: "0 2px 4px rgba(0,0,0,0.1)",
              medium: "0 4px 6px rgba(0,0,0,0.12)",
              large: "0 10px 15px rgba(0,0,0,0.15)",
            },
            hoverOpacity: "0.8",
          },
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#006FEE",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#006FEE",
              foreground: "#FFFFFF",
            },
            secondary: {
              50: "#f8f9fa",
              DEFAULT: "#6c757d",
              foreground: "#FFFFFF",
            },
            success: {
              50: "#e8f5e9",
              DEFAULT: "#28a745",
              foreground: "#FFFFFF",
            },
            warning: {
              50: "#fff3e0",
              DEFAULT: "#ffc107",
              foreground: "#000000",
            },
            danger: {
              50: "#ffebee",
              DEFAULT: "#dc3545",
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {
          layout: {
            boxShadow: {
              small: "0 2px 4px rgba(0,0,0,0.3)",
              medium: "0 4px 6px rgba(0,0,0,0.4)",
              large: "0 10px 15px rgba(0,0,0,0.5)",
            },
            hoverOpacity: "0.9",
          },
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            primary: {
              50: "#001731",
              100: "#002e62",
              200: "#004493",
              300: "#005bc4",
              400: "#006FEE",
              500: "#338ef7",
              600: "#66aaf9",
              700: "#99c7fb",
              800: "#cce3fd",
              900: "#e6f1fe",
              DEFAULT: "#338ef7",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
