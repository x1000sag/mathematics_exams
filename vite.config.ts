import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/** Сборка в один HTML: dist/index.html (JS, CSS, шрифты, favicon — внутри файла). */
export default defineConfig({
  base: '/mathematics_exams/',
  plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    assetsInlineLimit: Number.POSITIVE_INFINITY,
    cssCodeSplit: false,
    copyPublicDir: false,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'app.html'),
    },
  },
  server: { port: 4179, host: '0.0.0.0', strictPort: true },
  preview: { port: 4179, host: '0.0.0.0', strictPort: true },
})
