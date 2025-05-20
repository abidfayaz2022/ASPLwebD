#!/bin/bash
set -euo pipefail

# Stop Frontend
echo "Stopping frontend service..."
pm2 delete aspl-frontend || true
pkill -f "npx next start"

# Stop Backend
echo "Stopping backend service..."
pm2 delete aspl-backend || true
pkill -f "node index.js"

# Clean frontend build artifacts
echo "Cleaning previous Next.js build artifacts..."
rm -rf /home/ubuntu/angel/frontend/.next
rm -rf /home/ubuntu/angel/frontend/out
rm -rf /home/ubuntu/angel/frontend/.cache

# Clean backend artifacts
echo "Cleaning backend artifacts..."
rm -rf /home/ubuntu/angel/backend/node_modules

echo "Stop script execution completed."
