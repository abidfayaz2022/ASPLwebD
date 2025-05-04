#!/bin/bash
set -euo pipefail

apt-get update
apt-get install -y nodejs npm

node --version
npm --version
