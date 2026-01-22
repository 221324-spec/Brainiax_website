const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

async function main() {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI) {
    console.error('MONGO_URI not set in environment or backend/.env')
    process.exit(1)
  }

  const username = process.env.CREATE_ADMIN_USERNAME || process.argv[2]
  const password = process.env.CREATE_ADMIN_PASSWORD || process.argv[3]
  if (!username || !password) {
    console.error('Usage: node create_admin.js <username> <password> OR set CREATE_ADMIN_USERNAME and CREATE_ADMIN_PASSWORD in env')
    process.exit(1)
  }

  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const AdminUser = require(path.resolve(__dirname, '../src/models/AdminUser'))

  const passwordHash = await bcrypt.hash(password, 10)
  const doc = await AdminUser.findOneAndUpdate(
    { username },
    { username, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  console.log('Admin user created/updated:', doc.username)
  await mongoose.disconnect()
  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
