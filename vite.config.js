import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'email-api-dev-server',
      async configureServer(server) {
        const { app: emailApiApp } = await import('./server.js');
        server.middlewares.use(emailApiApp);
      }
    }
  ]
});
