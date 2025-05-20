#!/bin/bash
set -euo pipefail

# Install frontend dependencies
cd /home/ubuntu/angel/frontend
npm install

# Install backend dependencies
cd /home/ubuntu/angel/backend
npm install
