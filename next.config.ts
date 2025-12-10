import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable SWC styled-components support to ensure consistent class names
  // between server and client for styled-components SSR/hydration.
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
