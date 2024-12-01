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
              50: "hsla(70, 65%, 43%, 1)",  // Base color
              100: "hsla(70, 65%, 46%, 1)",
              200: "hsla(70, 65%, 48%, 1)",
              300: "hsla(70, 65%, 50%, 1)",
              400: "hsla(70, 65%, 53%, 1)",
              500: "hsla(70, 65%, 55%, 1)", // Main primary color
              600: "hsla(70, 65%, 58%, 1)",
              700: "hsla(70, 65%, 61%, 1)",
              800: "hsla(70, 65%, 64%, 1)",
              900: "hsla(70, 65%, 67%, 1)",
              DEFAULT: "hsla(70, 65%, 55%, 1)", // Default primary color
              foreground: "#FFFFFF",
            },
            secondary: {
              50: "hsla(0, 0%, 99%, 0.25)",
              100: "hsla(0, 0%, 99%, 0.5)",
              200: "hsla(0, 0%, 99%, 0.75)",
              300: "hsla(0, 0%, 100%, 1)",
              400: "hsla(0, 0%, 90%, 1)",
              500: "hsla(0, 0%, 85%, 1)",
              600: "hsla(0, 0%, 80%, 1)",
              DEFAULT: "hsla(0, 0%, 75%, 1)",  // Light gray
              foreground: "#000000",
            },
            success: {
              50: "hsla(130, 60%, 95%, 1)",
              DEFAULT: "hsla(130, 60%, 55%, 1)",
              foreground: "#FFFFFF",
            },
            warning: {
              50: "hsla(40, 100%, 95%, 1)",
              DEFAULT: "hsla(40, 100%, 60%, 1)",
              foreground: "#000000",
            },
            danger: {
              50: "hsla(360, 100%, 95%, 1)",
              DEFAULT: "hsla(360, 100%, 60%, 1)",
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
            background: "#11181C",  // Dark background
            foreground: "#ECEDEE",  // Light text for dark theme
            primary: {
              50: "hsla(70, 47%, 58%, 1)",  // Base color for dark theme
              100: "hsla(70, 47%, 60%, 1)",
              200: "hsla(70, 47%, 62%, 1)",
              300: "hsla(70, 47%, 64%, 1)",
              400: "hsla(70, 47%, 66%, 1)",
              500: "hsla(70, 47%, 68%, 1)", // Darker primary color
              600: "hsla(70, 47%, 70%, 1)",
              700: "hsla(70, 47%, 72%, 1)",
              800: "hsla(70, 47%, 74%, 1)",
              900: "hsla(70, 47%, 76%, 1)",
              DEFAULT: "hsla(70, 47%, 68%, 1)",
              foreground: "#FFFFFF",
            },
            secondary: {
              50: "hsla(0, 0%, 8%, 0.25)",
              100: "hsla(0, 0%, 8%, 0.5)",
              200: "hsla(0, 0%, 8%, 0.75)",
              300: "hsla(0, 0%, 8%, 1)",
              400: "hsla(0, 0%, 10%, 1)",
              500: "hsla(0, 0%, 15%, 1)",
              600: "hsla(0, 0%, 18%, 1)",
              DEFAULT: "hsla(0, 0%, 20%, 1)", // Dark gray
              foreground: "#FFFFFF",
            },
            success: {
              50: "hsla(130, 60%, 85%, 1)",
              DEFAULT: "hsla(130, 60%, 45%, 1)",
              foreground: "#FFFFFF",
            },
            warning: {
              50: "hsla(40, 100%, 85%, 1)",
              DEFAULT: "hsla(40, 100%, 50%, 1)",
              foreground: "#FFFFFF",
            },
            danger: {
              50: "hsla(360, 100%, 85%, 1)",
              DEFAULT: "hsla(360, 100%, 50%, 1)",
              foreground: "#FFFFFF",
            },
          },
        },
        light_accent: {
          colors: {
            background: "hsla(70, 76%, 32%, 1)", // Light accent background
            foreground: "hsla(0, 0%, 82%, 1)",
            accent: "hsla(70, 76%, 32%, 1)",
            secondary: "hsla(250, 50%, 95%, 1)", // Accent light color
          },
        },
        dark_accent: {
          colors: {
            background: "hsla(70, 76%, 46%, 1)", // Dark accent background
            foreground: "hsla(0, 0%, 46%, 1)",
            accent: "hsla(70, 76%, 46%, 1)",
            secondary: "hsla(250, 50%, 90%, 1)", // Accent dark color
          },
        },
      },
    }),
  ],
};
