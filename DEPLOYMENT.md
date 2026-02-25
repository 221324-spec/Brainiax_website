# Deployment Guide

## Frontend + Admin Panel Deployment (Vercel)

### Overview
This deployment includes both the React frontend and admin panel as one Vercel project. The admin panel is located in `frontend/public/admin/` and automatically gets built into the final deployment.

### Project Structure
```
frontend/
├── public/
│   ├── admin/              # Static admin panel
│   │   ├── index.html
│   │   └── admin.css
│   ├── assets/
│   └── favicon.svg
├── src/                    # React application
├── dist/                   # Build output (auto-generated)
│   ├── index.html          # Main React app
│   ├── admin/              # Admin panel (copied from public/)
│   └── assets/             # Build assets
└── package.json
```

### Prerequisites
- GitHub repository connected to Vercel
- Vercel account

### Vercel Configuration
1. **Root Directory**: Select **"frontend"** when prompted by Vercel
2. **Build Command**: `npm ci && npm run build` (automatically detected)
3. **Output Directory**: `dist` (automatically detected)
4. **Install Command**: `npm ci` (automatically detected)

### Environment Variables
Set in Vercel dashboard:
- `VITE_API_BASE_URL` = Your backend URL from Render (e.g., `https://brainiax-backend.onrender.com`)

### Build Process
1. Vite builds the React frontend
2. Vite automatically copies `frontend/public/` contents (including admin panel) to `dist/`
3. Result: Combined frontend + admin deployment

### Routing
- `/` → Main React application
- `/admin` → Static admin panel  
- `/admin/*` → Admin panel assets
- All other routes → React router (SPA fallback)

---

## Backend Deployment (Render)

### Prerequisites
- Render account
- GitHub repository

### Configuration
1. Use the `render.yaml` file for automatic deployment configuration
2. Set the following environment variables in Render dashboard:
   - `MONGO_URI` = Your MongoDB connection string
   - `CLIENT_ORIGIN` = Your Vercel frontend URL (e.g., `https://brainiax.vercel.app`)
   - `JWT_SECRET` = Strong random string (auto-generated)
   - `ADMIN_TOKEN` = Strong random string (auto-generated)
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = Your Gmail address
   - `SMTP_PASS` = Your Gmail app password
   - `OWNER_EMAIL` = Your business email

### Build Settings
- **Build Command**: `cd backend && npm ci`
- **Start Command**: `cd backend && npm start`

### Auto-Admin Creation
The backend automatically creates a default admin user on first startup:
- **Default Username**: `admin` (or from `CREATE_ADMIN_USERNAME` env var)
- **Default Password**: `admin123` (or from `CREATE_ADMIN_PASSWORD` env var)

**🚨 Important**: Change the default password after first login!

---

## Deployment Steps

### 1. Deploy Backend First
1. Push your code to GitHub
2. Connect repository to Render  
3. Set environment variables (see below)
4. Deploy backend service
5. **Admin user is auto-created** on first startup
6. Note the backend URL (e.g., `https://brainiax-backend.onrender.com`)

### 2. Deploy Frontend + Admin
1. Connect repository to Vercel
2. **IMPORTANT**: When prompted, select **"frontend"** as the root directory
3. Set environment variables:
   - `VITE_API_BASE_URL` = your backend URL
4. Deploy

### 3. Update CORS
Update backend `CLIENT_ORIGIN` environment variable with your Vercel URL

---

## Environment Variables Summary

### Frontend (.env)
```env
VITE_API_BASE_URL=https://brainiax-backend.onrender.com
```

### Backend (.env)  
```env
MONGO_URI=mongodb+srv://...
PORT=5000
CLIENT_ORIGIN=https://brainiax.vercel.app
JWT_SECRET=your-strong-jwt-secret
ADMIN_TOKEN=your-strong-admin-token

# Admin user auto-creation (optional)
CREATE_ADMIN_USERNAME=admin
CREATE_ADMIN_PASSWORD=your-secure-password

# Email settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
OWNER_EMAIL=info@brainiaxsolutions.com
```

---

## Testing Deployment

1. **Backend Health Check**: Visit `https://your-backend.onrender.com/health`
2. **Frontend**: Visit your Vercel URL
3. **Admin Panel**: Visit `https://your-frontend.vercel.app/admin`
4. **API Connection**: Test contact form and job applications

---

## Key Benefits of This Setup

✅ **Simplified Deployment**: Select frontend folder in Vercel - everything is included  
✅ **Clean Structure**: No root package files needed - frontend is self-contained  
✅ **Auto-Detection**: Vite framework auto-detected by Vercel  
✅ **Single Domain**: Frontend and admin on same domain  
✅ **Easy Maintenance**: All frontend code in one directory