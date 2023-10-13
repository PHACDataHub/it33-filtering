FROM node:18-alpine

WORKDIR /home/api

# the "node" user is created in the base image, non-root
# it's non-root and owner of the container's node/npm installs
RUN chown -R node .
USER node

# To achieve live-updates against the host OS' source code, our docker-compose attaches
# that chunk of the host file system as a volume on this image's containers, at the
# workdir location. This leads to all sorts of conflicts over ownership of the host's
# node_modules...
# To avoid THAT, after attaching the host filesystem at WORKDIR/, our docker-compose then
# attaches a second, empty and anonymous, volume at WORKDIR/node_modules. Then, to make 
# sure the container's run time user can write to this anonymous volume, there has to
# be a placeholder node_modules in the image itself; the anoymous volume will use this
# placeholder and it's permission as a default.
# ... yes this is ugly, but docker's declared this sort of selective volume mounting
# as a #wontfix (due to underlying file system limitations) so this is the only way 
RUN mkdir ./node_modules

EXPOSE $PORT
EXPOSE $DEBUG_PORT

CMD npm ci && node --inspect="0.0.0.0:${DEBUG_PORT}" --watch index.js