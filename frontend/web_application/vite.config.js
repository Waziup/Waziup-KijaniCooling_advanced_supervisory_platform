import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Same path as nginx in the Docker image: forward API calls to the local backend
      '/kijanicooling/api': 'http://localhost:5000',
    },
  },
})
