import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/** Сборка в один HTML: dist/index.html (JS, CSS, шрифты, favicon — внутри файла). */
export default defineConfig({
  plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    assetsInlineLimit: Number.POSITIVE_INFINITY,
    cssCodeSplit: false,
    copyPublicDir: false,
  },
  server: { port: 4179, host: '0.0.0.0', strictPort: true },
  preview: { port: 4179, host: '0.0.0.0', strictPort: true },
})
