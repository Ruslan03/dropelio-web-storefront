import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      domains: ['ordr.shop', 'dropelio.xyz', 'dz88.online'],
   },
};

export default withNextIntl(nextConfig);
