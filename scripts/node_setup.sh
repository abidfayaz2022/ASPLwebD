#!/bin/bash
set -euo pipefail

# Install prerequisites
apt-get update
apt-get install -y curl

# Use NodeSource to get Node 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify
echo "Node   → $(node --version)"
echo "npm    → $(npm --version)"
