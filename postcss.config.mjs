/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        // Include the Tailwind CSS plugin to enable Tailwind support in PostCSS
        tailwindcss: {},

        // Autoprefixer automatically adds vendor prefixes for CSS properties to ensure cross-browser compatibility
        autoprefixer: {},
    },
};

export default config;
