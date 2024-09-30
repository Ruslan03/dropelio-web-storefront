import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      domains: ['test.dropelio.xyz', 'dropelio.xyz'],
   },
};

export default withNextIntl(nextConfig);
