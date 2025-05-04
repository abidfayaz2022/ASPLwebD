#!/bin/bash
set -euo pipefail
cd /home/ubuntu/angel/frontend
npm run build

# DEV server on 0.0.0.0:3000
nohup npm run start -- --host 0.0.0.0 --port 3000 \
  > /var/log/frontend-start.log 2>&1 &
