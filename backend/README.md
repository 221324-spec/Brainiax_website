# Brainiax Backend

This is a minimal Node.js + Express backend for the Brainiax website. It uses MongoDB (Mongoose) and provides API endpoints for jobs, contact submissions, and resume uploads.

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `CLIENT_ORIGIN`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create an `uploads/` folder in `backend/` to store resume files:

```bash
mkdir uploads
```

4. Run in development:

```bash
npm run dev
```

API endpoints

- `GET /api/jobs` - list active jobs
- `GET /api/jobs/:id` - get job
- `POST /api/jobs` - create job (protect in production)
- `PUT /api/jobs/:id` - update job (protect in production)
- `DELETE /api/jobs/:id` - delete job (protect in production)
- `POST /api/contacts` - submit contact form
- `POST /api/resumes` - submit resume (multipart form: field `resume`)

Notes

- This scaffold stores uploaded resumes in `backend/uploads` and exposes them at `/uploads/<filename>`; for production, use S3 or similar.
- Secure admin endpoints with authentication before using in production.
