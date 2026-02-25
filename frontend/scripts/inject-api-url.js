#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the API URL from environment variable
const apiUrl = process.env.VITE_API_BASE_URL || '';

// Path to the admin index.html in dist
const adminHtmlPath = path.join(__dirname, '..', 'dist', 'admin', 'index.html');

// Check if file exists
if (fs.existsSync(adminHtmlPath)) {
  let content = fs.readFileSync(adminHtmlPath, 'utf8');
  
  // Replace the placeholder with actual API URL
  content = content.replace('__VITE_API_BASE_URL__', apiUrl);
  
  fs.writeFileSync(adminHtmlPath, content, 'utf8');
  console.log(`✅ Injected API_URL into admin panel: ${apiUrl || '(not set)'}`);
} else {
  console.log('⚠️  Admin index.html not found, skipping API URL injection');
}
