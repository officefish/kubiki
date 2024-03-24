//import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import swc from 'unplugin-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [swc.vite()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@modules': fileURLToPath(
        new URL('./src/server/modules', import.meta.url),
      ),
    },
  },
  test: {
    include: ['./vitest/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
