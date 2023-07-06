FROM node:20
WORKDIR /app
COPY . .
# install dep.
RUN npm ci
 

# Expose port 8080 for NGINX
EXPOSE 8080

# Substitute the environment variables and generate the final config
CMD node index.js