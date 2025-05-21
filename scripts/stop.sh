#!/bin/bash
set -euo pipefail

echo "Stopping frontend service..."
# Stop PM2 frontend process if it exists
pm2 describe aspl-frontend >/dev/null 2>&1 && pm2 delete aspl-frontend || true

# Kill any lingering Next.js processes
pkill -f "npx next start" || true

echo "Stopping backend service..."
# Stop PM2 backend process if it exists
pm2 describe aspl-backend >/dev/null 2>&1 && pm2 delete aspl-backend || true

# Kill any lingering backend node processes
pkill -f "node index.js" || true

echo "Cleaning previous Next.js build artifacts..."
[ -d /home/ubuntu/angel/frontend/.next ] && rm -rf /home/ubuntu/angel/frontend/.next
[ -d /home/ubuntu/angel/frontend/out ] && rm -rf /home/ubuntu/angel/frontend/out
[ -d /home/ubuntu/angel/frontend/.cache ] && rm -rf /home/ubuntu/angel/frontend/.cache

echo "Cleaning backend artifacts..."
[ -d /home/ubuntu/angel/backend/node_modules ] && rm -rf /home/ubuntu/angel/backend/node_modules

echo "Stop script execution completed successfully."
exit 0
