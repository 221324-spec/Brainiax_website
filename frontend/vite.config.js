import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function adminRewritePlugin() {
  return {
    name: 'vite:admin-rewrite',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          const url = req.url.split('?')[0]
          if (url === '/admin' || url === '/admin/') {
            req.url = '/admin/index.html'
          }
        } catch (e) {}
        next()
      })
    }
  }
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devApiTarget = env.DEV_API_TARGET

  return defineConfig({
    plugins: [react(), adminRewritePlugin()],
    server: {
      port: 3000,
      open: true,
      ...(devApiTarget ? {
        proxy: {
          '/api': { target: devApiTarget, changeOrigin: true },
          '/uploads': { target: devApiTarget, changeOrigin: true }
        }
      } : {})
      // /admin is served statically from frontend/public/admin (rewrite handled by plugin)
    }
  })
}
