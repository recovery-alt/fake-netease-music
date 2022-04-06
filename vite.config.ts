import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import { resolve } from 'path';

export default defineConfig({
  base: '',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#d33a31',
        },
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('lodash')) {
            return 'lodash';
          } else if (id.includes('react-router-dom')) {
            return 'react-router-dom';
          } else if (id.includes('react-redux')) {
            return 'react-redux';
          } else if (id.includes('react')) {
            return 'react';
          } else if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  plugins: [
    react(),
    eslintPlugin(),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: name => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
});
