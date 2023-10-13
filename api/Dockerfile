FROM node:18-alpine
WORKDIR /home/api

EXPOSE $PORT
EXPOSE $DEBUG_PORT

CMD npm ci && node --inspect="0.0.0.0:${DEBUG_PORT}" --watch index.js