#!/bin/bash
set -euo pipefail

# 1) Refresh and purge any older Node.js
apt-get update
apt-get remove -y nodejs || true

# 2) Install prerequisites
apt-get install -y curl gnupg build-essential

# 3) Add NodeSource 20.x and install
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 4) Verify
echo "➤ node → $(node --version)"
echo "➤ npm  → $(npm --version)"
