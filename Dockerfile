FROM node:18 AS builder
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
# Copy the nginx configuration template to the nginx config directory
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for NGINX
EXPOSE 8080

# Substitute the environment variables and generate the final config
CMD exec nginx -g 'daemon off;'