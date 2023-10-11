FROM node:18-alpine
WORKDIR /app
COPY . .

RUN npm ci
 
EXPOSE $PORT

CMD node --watch index.js