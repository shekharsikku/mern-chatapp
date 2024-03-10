import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/': 'http://localhost:8070',
    },
    port: 8050,
  },
  preview: {
    proxy: {
      '/api/': 'http://localhost:8070',
    },
    port: 8060,
  },
  plugins: [react()],
});