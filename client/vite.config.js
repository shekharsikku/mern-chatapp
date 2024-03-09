import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api/v1/': 'http://127.0.0.1:8000',
    // },
    port: 8050,
  },
  preview: {
    // proxy: {
    //   '/api/v1/': 'http://127.0.0.1:8000',
    // },
    port: 8060,
  },
  plugins: [react()],
});