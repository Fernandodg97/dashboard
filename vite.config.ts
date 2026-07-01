/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// Detectamos si estamos compilando en el servidor de Netlify
const isNetlify = process.env.NETLIFY === 'true';

export default defineConfig({
  base: '/dashboard/',
  plugins: [
    vue(),
    // SI ESTÁ EN NETLIFY, DESACTIVAMOS EL PLUGIN LEGACY PARA QUE NO EXPLOTE LA RAM
    !isNetlify ? legacy() : null
  ].filter(Boolean), // Filtra el 'null' para que Vite no falle
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
    sourcemap: false, // Desactivado para ahorrar otro 30% de RAM
    rollupOptions: {
      output: {
        // Agrupamos las tres librerías pesadas para aliviar la carga
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