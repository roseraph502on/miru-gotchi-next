import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable SWC styled-components support to ensure consistent class names
  // between server and client for styled-components SSR/hydration.
  compiler: {
    styledComponents: true,
  },
  // Ensure MUI uses styled-components as the styled engine instead of emotion
  webpack: (config) => {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    // Use the package name string so webpack resolves module correctly
    config.resolve.alias['@mui/styled-engine'] = '@mui/styled-engine-sc';
    return config;
  },
};

export default nextConfig;
