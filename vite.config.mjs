import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import viteCompression from "vite-plugin-compression";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import inject from "@rollup/plugin-inject";

// Determine build environment
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  build: {
    sourcemap: !isProd, // Generate sourcemaps only when not in production
    minify: isProd ? 'terser' : false, // Minify only in production
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PlugNPlay",
      formats: ["es"],
      fileName: (format) => `plug-n-play.${format}.js`,
    },
    rollupOptions: {
      external: [
        "@dfinity/auth-client",
        "@dfinity/principal",
        "@dfinity/candid",
        "@dfinity/agent",
        "@dfinity/identity",
        "@dfinity/utils",
      ],
      output: {
        format: "es",
        exports: "named",
      },
      plugins: [
        inject({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      esmExternals: true,
    },
    outDir: "dist",
    emptyOutDir: true,
    // Speed up build by using more resources
    reportCompressedSize: isProd,
    chunkSizeWarningLimit: 1000,
    target: "es2020",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@types": resolve(__dirname, "src/types"),
      "@src": resolve(__dirname, "src"),
      "iso-url": resolve(__dirname, "src/utils/url-node.ts"),
      buffer: "buffer/",
      process: "process/browser",
      stream: "stream-browserify",
      util: "util/",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      format: "esm",
      mainFields: ["module", "main"],
      conditions: ["module", "import", "default"],
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
    include: [
      "buffer",
      "process/browser",
      // Add Solana wallet adapter packages to optimizeDeps
      "@solana/wallet-adapter-base",
      "@solana/wallet-adapter-phantom",
      "@solana/wallet-adapter-solflare",
      "@solana/wallet-adapter-backpack",
      "@solana/wallet-adapter-walletconnect",
      "@solana/web3.js",
      "@solana/spl-token",
    ],
  },
  plugins: [
    // TypeScript declarations plugin - optimized config
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        declaration: true,
        skipLibCheck: true, // Skip type checking of declaration files
      },
      logDiagnostics: isProd, // Only log diagnostics in production
      // Skip type checking in development for faster builds
      skipDiagnostics: !isProd,
    }),
    // Static asset copying
    viteStaticCopy({
      targets: [
        {
          src: "assets/*",
          dest: "assets",
        },
      ],
    }),
    // Conditional compression plugins for production only
    ...(isProd
      ? [
          viteCompression({
            verbose: false, // Reduce logging
            disable: false,
            threshold: 5024 * 10, // Only compress files > 10KB
            algorithm: "gzip",
            ext: ".gz",
          }),
          viteCompression({
            verbose: false, // Reduce logging
            disable: false,
            threshold: 5024 * 10, // Only compress files > 10KB
            algorithm: "brotliCompress",
            ext: ".br",
          }),
        ]
      : []),
  ],
  ssr: {
    noExternal: [
      "@dfinity/oisy-wallet-signer",
    ],
  },
  // Improve dev server performance
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
});
