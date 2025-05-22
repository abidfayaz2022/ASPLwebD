#!/bin/bash
set -euo pipefail

# Install frontend dependencies
cd /home/ubuntu/ASPLwebD/frontend
npm install

# Install backend dependencies
cd /home/ubuntu/ASPLwebD/backend
npm install
