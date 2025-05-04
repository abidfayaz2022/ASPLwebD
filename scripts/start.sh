#!/bin/bash
set -euo pipefail

cd /home/ubuntu/angel/frontend

npm ci
npm run build

# Next.js on 0.0.0.0:80 (root required)
nohup npx next start --hostname 0.0.0.0 --port 80 \
  > /var/log/frontend-next.log 2>&1 &
