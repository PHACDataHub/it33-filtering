FROM node:20 AS builder
WORKDIR /app
COPY . .
# install dep.
RUN npm ci

# produces build dir.
RUN npm run build

# Use a nginx Docker image
# Pin the minor version
FROM nginx:1.23-alpine

# Copy the static HTMLs to the nginx directory
COPY --from=builder /app/build  /usr/share/nginx/html

# Create the nginx configuration template to the nginx config directory
RUN echo -e "server {\n\
    listen 8080;\n\
    server_name localhost;\n\
    location / {\n\
        root   /usr/share/nginx/html;\n\
        index  index.html index.htm;\n\
    }\n\
}" > /etc/nginx/conf.d/default.conf

# Expose port 8080 for NGINX
EXPOSE 8080

# Substitute the environment variables and generate the final config
CMD exec nginx -g 'daemon off;'