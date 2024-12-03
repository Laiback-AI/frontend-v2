import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnvConfig } from '@next/env';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const isDev = process.env.NODE_ENV !== 'production';
loadEnvConfig(process.cwd(), isDev);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Add alias for easier imports
        config.resolve.alias['@'] = path.join(__dirname, 'src');
        return config;
    },
    env: {
        // Expose public environment variables
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    },
};

export default nextConfig;
