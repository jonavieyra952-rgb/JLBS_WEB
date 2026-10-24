import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        inicio: resolve(process.cwd(), 'index.html'),
        camaras: resolve(process.cwd(), 'camaras-de-seguridad-toluca/index.html'),
        privacidad: resolve(process.cwd(), 'aviso-de-privacidad/index.html'),
      },
    },
  },
})
