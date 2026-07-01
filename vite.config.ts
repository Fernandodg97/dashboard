/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

const isNetlify = process.env.NETLIFY === 'true';

export default defineConfig({
  base: '/dashboard/',
  plugins: [
    vue(),
    !isNetlify ? legacy() : null
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    sourcemap: false,
    // SI ESTÁ EN NETLIFY, APAGAMOS EL MINIFICADOR PESADO PARA EVITAR EL OUT OF MEMORY
    minify: isNetlify ? false : 'esbuild',
    rollupOptions: {
      output: {
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