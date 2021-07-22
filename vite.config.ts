import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import viteEslint from '@ehutch79/vite-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': '/src' },
  },
  plugins: [reactRefresh(), viteEslint()],
});
