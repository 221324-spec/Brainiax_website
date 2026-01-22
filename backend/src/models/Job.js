const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  type: { type: String },
  salary: { type: String },
  description: { type: String },
  requirements: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  validityDate: { type: Date },
  applicationsCount: { type: Number, default: 0 },
  postedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
})

// Indexes for faster queries
JobSchema.index({ isActive: 1, postedDate: -1 })

module.exports = mongoose.model('Job', JobSchema)
