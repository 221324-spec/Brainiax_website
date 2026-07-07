const express = require('express')
const router = express.Router()
const LetterVerification = require('../models/LetterVerification')
const adminAuth = require('../middleware/adminAuth')

// POST /api/letters/verify - public letter verification lookup
router.post('/verify', async (req, res) => {
  try {
    const { verification_code, letter_type } = req.body || {}
    if (!verification_code || !verification_code.trim()) {
      return res.status(400).json({ result: 'invalid', message: 'Verification code is required' })
    }

    const query = { verification_code: verification_code.trim().toUpperCase() }
    if (letter_type && ['Offer', 'Experience'].includes(letter_type)) {
      query.letter_type = letter_type
    }

    const record = await LetterVerification.findOne(query)

    if (!record) {
      return res.json({
        result: 'not_found',
        message: 'Verification Failed – This document could not be verified.'
      })
    }

    if (record.status === 'Revoked') {
      return res.json({
        result: 'revoked',
        message: 'This document has been revoked. Please contact the company.'
      })
    }

    res.json({
      result: 'valid',
      record: {
        employee_name: record.employee_name,
        letter_type: record.letter_type,
        designation: record.designation,
        department: record.department,
        issue_date: record.issue_date,
        joining_date: record.joining_date,
        status: 'Valid'
      }
    })
  } catch (err) {
    console.error('Letter verify error:', err)
    res.status(500).json({ result: 'error', message: 'Server error' })
  }
})

// POST /api/letters - create verification record (protected)
router.post('/', adminAuth, async (req, res) => {
  try {
    const letter = new LetterVerification(req.body)
    await letter.save()
    res.status(201).json(letter)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A record with this verification code already exists' })
    }
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
})

// GET /api/letters/:id - get single record (protected)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const letter = await LetterVerification.findById(req.params.id)
    if (!letter) return res.status(404).json({ message: 'Record not found' })
    res.json(letter)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/letters/:id - update record (protected)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const letter = await LetterVerification.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    if (!letter) return res.status(404).json({ message: 'Record not found' })
    res.json(letter)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A record with this verification code already exists' })
    }
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
})

// DELETE /api/letters/:id - delete record (protected)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const letter = await LetterVerification.findByIdAndDelete(req.params.id)
    if (!letter) return res.status(404).json({ message: 'Record not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
