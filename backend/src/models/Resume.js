const mongoose = require('mongoose')

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  position: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  resumeUrl: { type: String, required: true },
  resumeFileName: { type: String },
  resumeSize: { type: Number },
  createdAt: { type: Date, default: Date.now }
})

// Indexes for faster recent listing
ResumeSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Resume', ResumeSchema)
