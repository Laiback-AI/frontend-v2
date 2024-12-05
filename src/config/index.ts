// src/config/index.ts

export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  // Add more configuration settings as needed
};

// Optionally, define types for your config
export type Config = typeof config;
