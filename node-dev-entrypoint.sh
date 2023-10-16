#!/bin/sh
set -o errexit
set -o pipefail
set -o nounset

# WARNING: this needs to run inside the app docker container, which is alpine linux
# That means sh instead of bash, different unix utilities, etc

npm ci

# Using tmux to manage backgrounded process(es) rather than the sh `&`, because of
# an issue with react-scripts start command. In projects using react-scripts, `npm start`
# launches three separate processes, and sending a TERM signal to just `npm start` doesn't 
# properly clean up all of them, at which point the dev server port is still in use and calling
# `npm start` again will throw errors.
# By executing the container command in a tmux managed shell session, tmux tracks all the 
# session's processes and is responsible for killing them all when the session's killed.
tmux new-session -d -s container-command "${@}"

inotifywait -e close_write,moved_to,create -m . | while read -r directory events filename; do
  if [ "$filename" = "package-lock.json" ]; then
    echo "Host's package-lock.json has been modified; re-installing node modules and restarting container command"

    echo "Killing container command..."
    tmux kill-session -t container-command
    echo "Container command killed!"

    npm ci

    tmux new-session -d -s container-command "${@}"
    echo "Container command restarted"
  fi
done