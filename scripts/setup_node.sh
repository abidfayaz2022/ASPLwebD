#!/bin/bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive
export TERM=xterm

# 1) Refresh and purge any older Node.js
apt-get update
apt-get remove -y nodejs || true

# 2) Install prerequisites
apt-get install -y curl gnupg build-essential

# 3) Add NodeSource 20.x and install Node.js + npm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 4) Install PM2 globally
npm install -g pm2

# 5) Install Puppeteer/Chromium system dependencies
apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2t64 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget \
  libgbm1 \
  libgtk-3-0 \
  libxshmfence1 \
  libxss1

# 6) Verify installation
echo "➤ node → $(node --version)"
echo "➤ npm  → $(npm --version)"
echo "➤ PM2  → $(pm2 --version)"
