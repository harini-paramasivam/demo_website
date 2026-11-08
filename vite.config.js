import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { app as emailApiApp } from './server.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'email-api-dev-server',
      configureServer(server) {
        server.middlewares.use(emailApiApp);
      }
    }
  ]
});
