import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'travel-planner',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://travel-planner:5000',
        changeOrigin: true,
      },
    },
  },
});