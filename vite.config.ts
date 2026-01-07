
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use process.cwd() with fallback
  const root = (typeof process !== 'undefined' && process.cwd) ? process.cwd() : './';
  const env = loadEnv(mode, root, '');
  
  return {
    plugins: [react()],
    define: {
      // Ensure the value is always a valid string literal in the bundle
      'process.env.API_KEY': JSON.stringify(env.API_KEY || "")
    },
    server: {
      port: 3000,
      open: true
    },
    // 🟢 ADDED THIS BUILD SECTION BELOW
    build: {
      chunkSizeWarningLimit: 1000, // Increases the limit to 1000kB to remove the warning
      rollupOptions: {
        output: {
          // This splits your heavy AI/Lucide libraries into a separate file 
          // called 'vendor', which makes the site load more efficiently.
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
