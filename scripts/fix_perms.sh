#!/bin/bash
set -euo pipefail

# Fix permissions for frontend
chown -R ubuntu:ubuntu /home/ubuntu/ASPLwebD/frontend

# Fix permissions for backend
chown -R ubuntu:ubuntu /home/ubuntu/ASPLwebD/backend

