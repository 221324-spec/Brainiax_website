const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Resume = require('../models/Resume')
const Job = require('../models/Job')
const { notifyNewApplication } = require('../utils/emailService')

// Multer setup - store uploads in /backend/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'))
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const name = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
    cb(null, name)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.includes(ext)) cb(null, true)
    else cb(new Error('Only PDF/DOC/DOCX allowed'))
  }
})

// POST /api/resumes - upload file and save metadata
router.post('/', (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      console.error('Multer upload error:', err)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max size is 5MB.' })
      }
      return res.status(400).json({ message: err.message || 'File upload failed' })
    }
    next()
  })
}, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const { name, email, phone, position, jobId } = req.body
    const resumeUrl = `/uploads/${req.file.filename}`

    const doc = new Resume({
      name,
      email,
      phone,
      position,
      jobId,
      resumeUrl,
      resumeFileName: req.file.originalname,
      resumeSize: req.file.size
    })
    await doc.save()

    let job = null
    // If jobId provided, increment applicationsCount atomically
    if (jobId) {
      try {
        job = await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } }, { new: true })
      } catch (e) {
        console.warn('Failed to increment application count for jobId:', jobId, e.message)
      }
    }

    // Send email notification to owner (async, don't block response)
    notifyNewApplication(doc, job).catch(err => console.error('Email notification failed:', err))

    res.status(201).json({ message: 'Application submitted', resumeUrl })
  } catch (err) {
    console.error('Resume submission error:', err)
    res.status(500).json({ message: 'Upload failed', error: err.message })
  }
})

module.exports = router
