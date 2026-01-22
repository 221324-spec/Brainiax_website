const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')
const { notifyNewContact } = require('../utils/emailService')

// POST /api/contacts - submit contact form
router.post('/', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body)
    const payload = req.body
    const contact = new Contact(payload)
    await contact.save()
    
    console.log('Contact saved to DB:', contact._id)
    // Send email notification to owner (async, don't block response)
    notifyNewContact(contact).catch(err => console.error('Email notification failed:', err))
    
    res.status(201).json({ message: 'Submitted' })
  } catch (err) {
    console.error('Contact submission error:', err)
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
})

module.exports = router
