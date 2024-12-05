import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // Enables dark mode based on a class
    plugins: [
        nextui({
            prefix: 'nextui', // Custom prefix for NextUI classnames
            addCommonColors: true, // Add common NextUI colors (e.g., black, white)
            defaultTheme: 'light', // Set default theme to 'light'
            defaultExtendTheme: 'light', // Extend the light theme by default
            layout: {
                radius: {
                    small: '0.25rem',
                    medium: '0.5rem',
                    large: '0.75rem',
                },
                fontSize: {
                    tiny: '0.75rem',
                    small: '0.875rem',
                    medium: '1rem',
                    large: '1.125rem',
                },
                lineHeight: {
                    tiny: '1rem',
                    small: '1.25rem',
                    medium: '1.5rem',
                    large: '1.75rem',
                },
                disabledOpacity: '0.5',
                dividerWeight: '1px',
            },
            themes: {
                light: {
                    layout: {
                        boxShadow: {
                            small: '0px 0x 20px rgba(0,0,0,0.15)',
                            medium: '0px 0px 20px rgba(0,0,0,0.18)',
                            large: '0px 0px 20px rgba(0,0,0,0.25)',
                        },
                        hoverOpacity: '0.6',
                    },
                    colors: {
                        background: '#FFFFFF',
                        foreground: '#11181C',
                        primary: {
                            50: 'hsla(70, 65%, 43%, 1)',
                            100: 'hsla(70, 65%, 46%, 1)',
                            200: 'hsla(70, 65%, 48%, 1)',
                            300: 'hsla(70, 65%, 50%, 1)',
                            400: 'hsla(70, 65%, 53%, 1)',
                            500: 'hsla(70, 65%, 55%, 1)',
                            600: 'hsla(70, 65%, 58%, 1)',
                            700: 'hsla(70, 65%, 61%, 1)',
                            800: 'hsla(70, 65%, 64%, 1)',
                            900: 'hsla(70, 65%, 67%, 1)',
                            DEFAULT: 'hsla(70, 65%, 55%, 1)', // Default primary color
                        },
                        secondary: {
                            50: 'hsla(0, 0%, 99%, 0.25)',
                            100: 'hsla(0, 0%, 99%, 0.5)',
                            200: 'hsla(0, 0%, 99%, 0.75)',
                            300: 'hsla(0, 0%, 100%, 1)',
                            400: 'hsla(0, 0%, 90%, 1)',
                            500: 'hsla(0, 0%, 85%, 1)',
                            600: 'hsla(0, 0%, 80%, 1)',
                            DEFAULT: 'hsla(0, 0%, 75%, 1)', // Light gray
                        },
                        success: {
                            50: 'hsla(130, 60%, 95%, 1)',
                            DEFAULT: 'hsla(130, 60%, 55%, 1)',
                        },
                        warning: {
                            50: 'hsla(40, 100%, 95%, 1)',
                            DEFAULT: 'hsla(40, 100%, 60%, 1)',
                        },
                        danger: {
                            50: 'hsla(360, 100%, 95%, 1)',
                            DEFAULT: 'hsla(360, 100%, 60%, 1)',
                        },
                    },
                },dark: {
                    layout: {
                        boxShadow: {
                            small: '0px 0px 20px rgba(171, 168, 58, 0.2)',
                            medium: '0px 0px 20px rgba(171, 168, 58, 0.3)',
                            large: '0px 0px 20px rgba(171, 168, 58, 0.4)',
                        },
                        hoverOpacity: '0.8',
                    },
                    colors: {
                        background: '#000000', // Deeper black background
                        foreground: '#FFFFFF', // Pure white text
                        primary: {
                            50: 'hsla(70, 75%, 85%, 1)',   // Lightest
                            100: 'hsla(70, 75%, 80%, 1)',
                            200: 'hsla(70, 75%, 75%, 1)',
                            300: 'hsla(70, 75%, 70%, 1)',
                            400: 'hsla(70, 75%, 65%, 1)',
                            500: 'hsla(70, 75%, 60%, 1)',  // Base color
                            600: 'hsla(70, 75%, 55%, 1)',
                            700: 'hsla(70, 75%, 50%, 1)',
                            800: 'hsla(70, 75%, 45%, 1)',
                            900: 'hsla(70, 75%, 40%, 1)',  // Darkest
                            DEFAULT: 'hsla(70, 75%, 60%, 1)', // Brighter primary for dark mode
                        },
                        secondary: {
                            50: 'hsla(0, 0%, 15%, 1)',
                            100: 'hsla(0, 0%, 25%, 1)',
                            200: 'hsla(0, 0%, 35%, 1)',
                            300: 'hsla(0, 0%, 45%, 1)',
                            400: 'hsla(0, 0%, 55%, 1)',
                            500: 'hsla(0, 0%, 65%, 1)',
                            600: 'hsla(0, 0%, 75%, 1)',
                            DEFAULT: 'hsla(0, 0%, 45%, 1)', // Darker gray for dark mode
                        },
                        success: {
                            50: 'hsla(142, 76%, 95%, 1)',
                            DEFAULT: 'hsla(142, 76%, 36%, 1)', // Darker green
                        },
                        warning: {
                            50: 'hsla(45, 100%, 95%, 1)',
                            DEFAULT: 'hsla(45, 100%, 50%, 1)', // Brighter yellow
                        },
                        danger: {
                            50: 'hsla(0, 84%, 95%, 1)',
                            DEFAULT: 'hsla(0, 84%, 60%, 1)', // Brighter red
                        },
                    },
                },
            },
        }),
    ],
};
