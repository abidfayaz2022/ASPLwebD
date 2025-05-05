#!/bin/bash

pkill -f "npx next start"

PID=$(lsof -ti tcp:$PORT)

if [ ! -z "$PID" ]; then
  echo "Stopping app running on port $PORT (PID: $PID)"
  kill -9 $PID
else
  echo "No app running on port $PORT"
fi
