const express = require('express')
const router = express.Router()
const Resume = require('../models/Resume')
const Contact = require('../models/Contact')
const Job = require('../models/Job')
const AdminUser = require('../models/AdminUser')
const Setting = require('../models/Setting')
const adminAuth = require('../middleware/adminAuth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// POST /api/admin/login - username/password -> returns JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {}
    if (!username || !password) return res.status(400).json({ message: 'username and password required' })
    const user = await AdminUser.findOne({ username })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
    const secret = process.env.JWT_SECRET
    if (!secret) return res.status(500).json({ message: 'JWT not configured' })
    const token = jwt.sign({ sub: user._id.toString(), username: user.username }, secret, { expiresIn: '8h' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/admin/register - create initial admin user (protected by static ADMIN_TOKEN)
router.post('/register', async (req, res) => {
  try {
    const legacy = req.headers['x-admin-token'] || req.query.adminToken
    if (!process.env.ADMIN_TOKEN || legacy !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const { username, password } = req.body || {}
    if (!username || !password) return res.status(400).json({ message: 'username and password required' })
    const existing = await AdminUser.findOne({ username })
    if (existing) return res.status(409).json({ message: 'User exists' })
    const hash = await bcrypt.hash(password, 10)
    const user = await AdminUser.create({ username, passwordHash: hash })
    res.json({ id: user._id, username: user.username })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})


// ============ RESUMES / APPLICATIONS ============

// GET /api/admin/resumes - list resume submissions (protected)
router.get('/resumes', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10)
    const limit = parseInt(req.query.limit || '20', 10)
    const skip = (page - 1) * limit
    const query = {}
    if (req.query.jobId) {
      query.jobId = req.query.jobId
    } else if (req.query.position) {
      query.position = req.query.position
    }
    const total = await Resume.countDocuments(query)
    const items = await Resume.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
    res.json({ total, page, limit, items })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/admin/resumes/:id - resume metadata (protected)
router.get('/resumes/:id', adminAuth, async (req, res) => {
  try {
    const doc = await Resume.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/admin/resumes/:id - delete resume (protected)
router.delete('/resumes/:id', adminAuth, async (req, res) => {
  try {
    const doc = await Resume.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ CONTACTS ============

// GET /api/admin/contacts - list contact submissions (protected)
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10)
    const limit = parseInt(req.query.limit || '20', 10)
    const skip = (page - 1) * limit
    const status = req.query.status // optional filter: 'new', 'contacted', 'resolved'
    
    const query = status ? { status } : {}
    const total = await Contact.countDocuments(query)
    const items = await Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
    res.json({ total, page, limit, items })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/admin/contacts/:id - contact detail (protected)
router.get('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const doc = await Contact.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/admin/contacts/:id - update contact status (protected)
router.put('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body // 'new', 'contacted', 'resolved'
    const doc = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/admin/contacts/:id - delete contact (protected)
router.delete('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const doc = await Contact.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ JOBS (all jobs including inactive) ============

// GET /api/admin/jobs - list all jobs (protected)
router.get('/jobs', adminAuth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ DASHBOARD STATS ============

// GET /api/admin/stats - dashboard statistics (protected)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [totalJobs, activeJobs, totalResumes, totalContacts, newContacts] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Resume.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' })
    ])
    
    // Recent activity
    const recentResumes = await Resume.find().sort({ createdAt: -1 }).limit(5)
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5)
    
    res.json({
      totalJobs,
      activeJobs,
      totalResumes,
      totalContacts,
      newContacts,
      recentResumes,
      recentContacts
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ SETTINGS ============

// GET /api/admin/settings/:key - get setting value
// Public access for 'hiringBannerEnabled', protected for all others
router.get('/settings/:key', async (req, res, next) => {
  // Allow public access to hiringBannerEnabled
  if (req.params.key === 'hiringBannerEnabled') {
    try {
      const setting = await Setting.findOne({ key: req.params.key })
      return res.json({ value: setting ? setting.value : false })
    } catch (err) {
      return res.status(500).json({ message: 'Server error' })
    }
  }
  // All other settings require auth
  adminAuth(req, res, () => {
    (async () => {
      try {
        const setting = await Setting.findOne({ key: req.params.key })
        res.json({ value: setting ? setting.value : null })
      } catch (err) {
        res.status(500).json({ message: 'Server error' })
      }
    })()
  })
})

// PUT /api/admin/settings/:key - update setting value (protected)
router.put('/settings/:key', adminAuth, async (req, res) => {
  try {
    const { value } = req.body
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value, updatedAt: new Date() },
      { upsert: true, new: true }
    )
    res.json({ value: setting.value })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ SERVER-SENT EVENTS (Realtime updates) ============
// Keep SSE route at end to avoid interfering with JSON routes
router.get('/events', adminAuth, async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders && res.flushHeaders()

  const send = (type, data) => {
    try {
      res.write(`event: ${type}\n`)
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    } catch (e) {
      // ignore write errors on disconnect
    }
  }

  // Keep-alive comment to prevent proxies from closing the connection
  const keepAlive = setInterval(() => {
    try { res.write(': keep-alive\n\n') } catch (e) {}
  }, 25000)

  const watchers = []
  const startWatch = (Model, type) => {
    try {
      const stream = Model.watch([], { fullDocument: 'updateLookup' })
      stream.on('change', (change) => send(type, change))
      stream.on('error', () => {/* noop */})
      watchers.push(stream)
    } catch (e) {
      // Change streams not supported (e.g., non-replica set); rely on client polling
    }
  }

  startWatch(Job, 'job-change')
  startWatch(Resume, 'resume-change')
  startWatch(Contact, 'contact-change')

  req.on('close', () => {
    clearInterval(keepAlive)
    watchers.forEach(w => w && w.close && w.close())
    try { res.end() } catch (e) {}
  })
})

module.exports = router
