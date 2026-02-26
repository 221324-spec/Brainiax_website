const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

dotenv.config({ path: path.join(__dirname, '.env') })

const connectDB = require('./src/config/db')
const AdminUser = require('./src/models/AdminUser')
const bcrypt = require('bcryptjs')
const jobsRouter = require('./src/routes/jobs')
const contactsRouter = require('./src/routes/contacts')
const resumesRouter = require('./src/routes/resumes')
const adminRouter = require('./src/routes/admin')

const app = express()

const PORT = process.env.PORT || 5000

// Ensure uploads directory exists (Render has ephemeral disk)
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log('Created uploads directory:', uploadsDir)
}

// Middleware
app.use(express.json())

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'http://localhost:3002',
  'http://localhost:5173',
  'http://localhost:5000',
  'https://brainiaxitsolutions.vercel.app',
  process.env.CLIENT_ORIGIN
].filter(Boolean);

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or if CLIENT_ORIGIN is '*'
    if (allowedOrigins.includes(origin) || process.env.CLIENT_ORIGIN === '*') {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS request from origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token']
}))

// Static uploads (resumes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Serve static assets in backend/public
app.use(express.static(path.join(__dirname, 'public')))

// Development: integrate Vite dev server as middleware so backend can serve frontend+admin on one port
const isDev = process.env.NODE_ENV !== 'production'
async function setupFrontendMiddleware() {
  try {
    const distPath = path.join(__dirname, '..', 'frontend', 'dist')

    if (isDev) {
      // Use Vite's middleware to serve the frontend from the backend port in development.
      // Try to require vite from backend first; if not available, require from frontend node_modules.
      let vite
      try {
        vite = require('vite')
      } catch (e) {
        try {
          const { createRequire } = require('module')
          const req = createRequire(path.join(__dirname, '..', 'frontend', 'package.json'))
          vite = req('vite')
        } catch (err) {
          throw err
        }
      }

      const root = path.join(__dirname, '..', 'frontend')
      const viteServer = await vite.createServer({
        root,
        logLevel: 'error',
        server: { middlewareMode: 'ssr' }
      })

      app.use(viteServer.middlewares)

      // No static fallback here; Vite middleware will handle index.html transformation.
      console.log('Vite middleware mounted (development). Frontend served on backend port.')
      return
    }

    // Production: serve built frontend from frontend/dist if present
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath))

      // Serve Admin static build if present (under dist/admin)
      const distAdminPath = path.join(distPath, 'admin')
      if (fs.existsSync(distAdminPath)) {
        app.use('/admin', express.static(distAdminPath))
        app.get('/admin', (req, res) => res.sendFile(path.join(distAdminPath, 'index.html')))
      }

      // SPA fallback for non-API routes
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next()
        if (req.path.startsWith('/admin') && !fs.existsSync(path.join(distPath, 'admin'))) return next()
        return res.sendFile(path.join(distPath, 'index.html'))
      })
    }
  } catch (err) {
    console.error('Error setting up frontend middleware:', err)
  }
}

// Initialize frontend serving (dev middleware or production static)
// setupFrontendMiddleware()

// Routes
app.use('/api/jobs', jobsRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/resumes', resumesRouter)
app.use('/api/admin', adminRouter)

// Health check endpoint for deployment verification
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  })
})

// No backend/public/admin fallback; admin is served from frontend/public during dev or dist/admin in prod

// Root
app.get('/', (req, res) => res.send('Brainiax Backend is running'))

// Auto-create admin user on startup if it doesn't exist
async function createDefaultAdmin() {
  try {
    const username = process.env.CREATE_ADMIN_USERNAME || 'admin'
    const password = process.env.CREATE_ADMIN_PASSWORD || 'admin123'
    
    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ username })
    if (existingAdmin) {
      console.log(`Admin user '${username}' already exists`)
      return
    }

    // Create new admin user
    const passwordHash = await bcrypt.hash(password, 10)
    const newAdmin = await AdminUser.create({ username, passwordHash })
    console.log(`✅ Default admin user created: ${newAdmin.username}`)
    console.log(`   Username: ${username}`)
    console.log(`   Password: ${password}`)
    console.log(`   🚨 Change password after first login!`)
  } catch (error) {
    console.error('❌ Failed to create default admin user:', error.message)
  }
}

// Connect DB and start
connectDB().then(async () => {
  // Create default admin user
  await createDefaultAdmin()
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(err => {
  console.error('Failed to connect to DB', err)
  process.exit(1)
})
