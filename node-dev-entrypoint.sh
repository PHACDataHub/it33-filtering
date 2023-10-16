#!/bin/sh
set -o errexit
set -o pipefail
set -o nounset

# WARNING: this needs to run inside the app docker container, which is alpine linux
# That means sh instead of bash, different unix utilities, etc

# Using tmux to manage backgrounded process(es) rather than sh `&` backgrounding, because of
# an issue with react-scripts start command. In projects using react-scripts, `npm start`
# launches three separate processes, and sending a TERM signal to just `npm start` doesn't 
# properly clean up all of them, at which point the dev server port is still in use and calling
# `npm start` again will throw errors.
#
# By executing the container command in a tmux managed shell session, tmux tracks all the 
# session's processes and is responsible for killing them all when the session's killed.
#
# Using a named pipe to buffer the tmux session's output and read it in to stdout

container_command="${*}"

tmux_session=container-command 

buffer=/tmp/tmux-output-buffer
mkfifo "${buffer}"

start_container_command () {
  echo "Starting container command"

  tmux new-session -d -s "${tmux_session}" "${container_command}"

  # Start reading from the buffer; note that cat terminates on EOF, so will end when the tmux session is killed
  cat "${buffer}" & 

  # Write the tmux managed shell's output in to the buffer
  tmux pipe-pane -o -t "${tmux_session}" "cat > ${buffer}" 
}

kill_container_command () {
  echo "Killing container command..."
  tmux kill-session -t "${tmux_session}"
  echo "Container command killed!"
}

# Initial package install and container command startup
echo "Installing packages..."
npm ci

start_container_command

# Watch for any changes in this directory that impace the package-lock.json
# Refresh the packages and restart the container command in response
inotifywait -e close_write,moved_to,create -m . | while read -r directory events filename; do
  if [ "$filename" = "package-lock.json" ]; then
    echo "Host's package-lock.json has been modified; re-installing node modules and restarting container command"

    kill_container_command

    echo "Installing packages..."
    npm ci
    
    start_container_command
  fi
done