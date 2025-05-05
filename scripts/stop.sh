#!/bin/bash

echo "Stopping any app running on port $PORT..."
pkill -f "npx next start"

PID=$(lsof -ti tcp:$PORT)

if [ ! -z "$PID" ]; then
  echo "Force killing process on port $PORT (PID: $PID)"
  kill -9 $PID
else
  echo "No app running on port $PORT"
fi

echo "Cleaning previous Next.js build artifacts..."
rm -rf /home/ubuntu/angel/frontend/.next
rm -rf /home/ubuntu/angel/frontend/out
rm -rf /home/ubuntu/angel/frontend/.cache

echo "Stop script execution completed."
