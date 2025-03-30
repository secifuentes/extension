import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ['@fortawesome/free-brands-svg-icons', '@fortawesome/free-solid-svg-icons'],  // Evitar errores de módulo
    },
  },
});