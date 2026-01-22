const jwt = require('jsonwebtoken')

module.exports = function adminAuth(req, res, next) {
  // support header x-admin-token (legacy/static) OR Authorization: Bearer <jwt>
  const legacy = req.headers['x-admin-token'] || req.query.adminToken
  if (legacy && process.env.ADMIN_TOKEN && legacy === process.env.ADMIN_TOKEN) return next()

  // If an adminToken query param is present and a JWT secret is configured, try JWT verify (useful for SSE/eventsource)
  const secret = process.env.JWT_SECRET
  if (req.query && req.query.adminToken && secret) {
    try {
      const payload = jwt.verify(req.query.adminToken, secret)
      req.admin = { id: payload.sub, username: payload.username }
      return next()
    } catch (e) {
      // fallthrough to header check
    }
  }

  const auth = req.headers.authorization || ''
  const m = auth.match(/^Bearer\s+(.+)$/i)
  if (!m) return res.status(401).json({ message: 'Unauthorized' })

  const token = m[1]
  if (!secret) return res.status(500).json({ message: 'JWT not configured' })
  try {
    const payload = jwt.verify(token, secret)
    req.admin = { id: payload.sub, username: payload.username }
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
