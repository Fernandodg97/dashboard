/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dashboard/',
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
    // Desactivamos temporalmente los mapas de código para ahorrar un 30% de RAM en el build
    sourcemap: false, 
    rollupOptions: {
      output: {
        // En lugar de romper todo en miles de archivos, agrupamos las 3 librerías pesadas por separado
        manualChunks(id) {
          if (id.includes('node_modules/echarts') || id.includes('node_modules/zrender')) {
            return 'vendor-echarts';
          }
          if (id.includes('node_modules/@ionic')) {
            return 'vendor-ionic';
          }
          if (id.includes('node_modules/chart.js')) {
            return 'vendor-chartjs';
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})