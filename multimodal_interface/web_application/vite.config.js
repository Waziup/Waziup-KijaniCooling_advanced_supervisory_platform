import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//
// The production build is hosted behind the Waziup platform reverse proxy at
// /apps/waziup.kijanicooling-supervisory-platform/ui/, so the built asset URLs
// need that base. In development the dev server must serve from '/' — otherwise
// visiting '/' redirects to the base path and the router (which has no basename)
// matches no route and renders a blank page.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/apps/waziup.kijanicooling-supervisory-platform/ui/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))