import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
      },
      include: '**/*.svg',
    }),
    react(),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
});
