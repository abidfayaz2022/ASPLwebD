#!/bin/bash
set -euo pipefail

cd /home/ubuntu/angel/frontend

npm ci
npm run build

# Run Next.js production server on port 3000
nohup npx next start --hostname 0.0.0.0 --port 3000 \
  > /var/log/frontend-next.log 2>&1 &

# Run dev server on all interfaces
# npm run dev -- --hostname 0.0.0.0 --port 3000 &
