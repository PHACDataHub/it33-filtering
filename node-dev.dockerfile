FROM node:18-alpine

# dependencies used in the entrypoint script
RUN apk add --no-cache inotify-tools \
  && apk add --no-cache tmux

WORKDIR /project

# make and switch to a non-root user
RUN adduser -u 5678 -G node -s /bin/sh -D container_user
RUN chown -R container_user .
USER container_user

# Intended use of this image is to mount the top level directory of a node project from the host
# as a volume at /project. We want to mount it as read-only, but we want this container to use
# it's own, writable, node_modules still. There's no mechanism to exclude a subdirectory from the
# host volume BUT if we already have a /node_modules volume under /project then that will be used instead.
# To make sure the container user can write to the volume, we create a place holder dir first. The
# volume will inherit the permissions from this placeholder.
RUN mkdir ./node_modules
VOLUME /project/node_modules

# This entrypoint syncs the container's node modules against the host workdir's package-lock.json.
# Uses inotify-tools to watch for changes to package-lock.json, kills and restarts the container
# command as needed
COPY --chown=container_user ./node-dev-entrypoint.sh /home/entrypoint.sh
ENTRYPOINT [ "/home/entrypoint.sh" ]

# Default, specify the appropriate command in your docker-compose.yaml/in your `docker` args/etc 
CMD npm start