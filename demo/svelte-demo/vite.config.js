import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: true,
        compatibility: {
          componentApi: 4
        }
      },
      hot: true
    }),
  ],
  resolve: {
    alias: {
      '@pnp': path.resolve(__dirname, '../../../../src'),
      buffer: 'buffer/',
      process: 'process/browser',
    },
  },
  define: {
    'process.env': {},
    'global': 'window',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
