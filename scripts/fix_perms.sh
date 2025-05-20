#!/bin/bash
set -euo pipefail

# Fix permissions for frontend
chown -R ubuntu:ubuntu /home/ubuntu/angel/frontend

# Fix permissions for backend
chown -R ubuntu:ubuntu /home/ubuntu/angel/backend

