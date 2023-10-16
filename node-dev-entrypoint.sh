#!/bin/sh
set -o errexit
set -o pipefail
set -o nounset

# WARNING: this needs to run inside the app docker container, which is alpine linux
# That means sh instead of bash, different unix utilities, etc

npm ci

$@ &
backgrounded_cmd_pid=$!
echo "Container command started (PID ${backgrounded_cmd_pid})"

inotifywait -e close_write,moved_to,create -m . | while read -r directory events filename; do
  if [ "$filename" = "package-lock.json" ]; then
    echo "Host's package-lock.json has been modified; re-installing node modules and restarting container command"

    echo "Killing container command (PID ${backgrounded_cmd_pid})..."
    kill -15 "${backgrounded_cmd_pid}"
    sleep 1
    echo "${backgrounded_cmd_pid} killed!"

    npm ci

    $@ &
    backgrounded_cmd_pid=$!
    echo "Container command restarted (PID ${backgrounded_cmd_pid})"
  fi
done