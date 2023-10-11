FROM node:18-alpine
WORKDIR /app
COPY . .

RUN npm ci

EXPOSE $PORT

CMD npm run start
