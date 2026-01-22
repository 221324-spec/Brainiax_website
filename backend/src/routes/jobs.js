const express = require('express')
const router = express.Router()
const Job = require('../models/Job')
const adminAuth = require('../middleware/adminAuth')

// GET /api/jobs - list active jobs
router.get('/', async (req, res) => {
  try {
    const now = new Date()
    const jobs = await Job.find({ 
      isActive: true,
      $or: [
        { validityDate: { $exists: false } },
        { validityDate: { $gt: now } }
      ]
    }).sort({ postedDate: -1 })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/jobs - create job (protected)
router.post('/', adminAuth, async (req, res) => {
  try {
    const payload = req.body
    const job = new Job(payload)
    await job.save()
    res.status(201).json(job)
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
})

// PUT /api/jobs/:id - update job (protected)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { ...req.body, updatedDate: Date.now() }, { new: true })
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.json(job)
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
})

// DELETE /api/jobs/:id (protected)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
