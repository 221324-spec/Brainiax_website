const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  message: { type: String },
  preferredDate: { type: String },
  preferredTime: { type: String },
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now }
})

// Indexes for efficient listing and filtering
ContactSchema.index({ createdAt: -1 })
ContactSchema.index({ status: 1, createdAt: -1 })

module.exports = mongoose.model('Contact', ContactSchema)
