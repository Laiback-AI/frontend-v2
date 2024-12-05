import path from 'path';
import { fileURLToPath } from 'url';
import pkg from '@next/env'; // Import Next.js' environment loader package
const { loadEnvConfig } = pkg;

// Determine the current directory for resolving paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from `.env` files
const isDev = process.env.NODE_ENV !== 'production'; // Check if the app is in development mode
loadEnvConfig(process.cwd(), isDev); // Load environment variables based on the environment

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Modify the Webpack configuration
    webpack: (config) => {
        // Add an alias for the `src` folder to simplify imports (e.g., `@/features/auth/...`)
        config.resolve.alias['@'] = path.join(__dirname, 'src');
        return config;
    },
    env: {
        // Expose public environment variables to the client-side application
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL, // API Base URL
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME, // Application name
    },
};

export default nextConfig;
