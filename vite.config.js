import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    // 🔹 ОБОВʼЯЗКОВО для GitHub Pages
    base: '/goit-js-hw-12/',

    // 🔹 Коренева папка
    root: 'src',

    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },

    build: {
      sourcemap: true,

      // 🔹 Правильний input (БЕЗ src/, бо root вже = src)
      rollupOptions: {
        input: glob.sync('./*.html'),

        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },

          entryFileNames: '[name].js',

          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },

      outDir: '../dist',
      emptyOutDir: true,
    },

    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
