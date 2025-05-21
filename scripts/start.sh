#!/bin/bash
set -euo pipefail

# Start Frontend
cd /home/ubuntu/angel/frontend

# Clean build
rm -rf .next

# ✅ Set frontend env variables for public API use
export NEXT_PUBLIC_ASPL_API_URL=http://13.251.247.41:3333
export NODE_ENV=production

# Install and build
npm ci
npm run build

# Restart PM2 app for frontend
pm2 delete aspl-frontend || true
pm2 start "npx next start --hostname 0.0.0.0 --port 3000" --name aspl-frontend

# Start Backend
cd /home/ubuntu/angel/backend

# Install dependencies
npm ci

# ✅ Set backend environment variables
export NODE_ENV=production
export BACKEND_PORT=3333
export CLIENT_BASE_URL=http://13.251.247.41:3000

# Restart PM2 app for backend
pm2 delete aspl-backend || true
pm2 start "node index.js" --name aspl-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to auto-start on reboot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
