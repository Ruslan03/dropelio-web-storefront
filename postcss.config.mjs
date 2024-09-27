/** @type {import('postcss-load-config').Config} */

const cssnano = [
   'cssnano',
   {
      preset: 'advanced',
      discardComments: { removeAll: true }
   }
]

const config = {
   plugins: [
      'postcss-import',
      'tailwindcss',
      'autoprefixer',
      ...(process.env.NODE_ENV === 'production' ? [cssnano] : [])
   ],
};

export default config;
