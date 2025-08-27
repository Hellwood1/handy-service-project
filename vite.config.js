// vite.config.js
import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import sortMediaQueries from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  const isBuild = command === 'build';

  return {
    root: 'src',
    base: isBuild ? '/handy-service-project/' : '/',
    define: {
      [isDev ? 'global' : '_global']: {},
    },

    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo =>
            chunkInfo.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
          assetFileNames: assetInfo =>
            assetInfo.name && assetInfo.name.endsWith('.html')
              ? '[name].[ext]'
              : 'assets/[name]-[hash][extname]',
        },
      },
    },

    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
    ],

    css: {
      postcss: {
        plugins: [
          sortMediaQueries({ sort: 'mobile-first' }),
        ],
      },
    },
  };
});
