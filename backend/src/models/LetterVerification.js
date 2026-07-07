const mongoose = require('mongoose')

const LetterVerificationSchema = new mongoose.Schema({
  verification_code: { type: String, required: true, unique: true, trim: true, uppercase: true },
  letter_type: { type: String, required: true, enum: ['Offer', 'Experience'] },
  employee_name: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  issue_date: { type: Date, required: true },
  joining_date: { type: Date, default: null },
  status: { type: String, enum: ['Active', 'Revoked'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'letter_verifications' })

module.exports = mongoose.model('LetterVerification', LetterVerificationSchema)
