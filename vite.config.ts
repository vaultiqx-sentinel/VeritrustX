
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use process.cwd() with fallback for environments where it might be missing
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
    }
  };
});
