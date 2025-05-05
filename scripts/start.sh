#!/bin/bash
set -euo pipefail

cd /home/ubuntu/angel/frontend

# Clean build
rm -rf .next

# Install and build
npm ci
npm run build

# Restart PM2 app
pm2 delete aspl-frontend || true
pm2 start "npx next start --hostname 0.0.0.0 --port 3000" --name aspl-frontend
pm2 save

# Setup PM2 to auto-start on reboot (safe to repeat)
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
