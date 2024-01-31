# Stage 1: Build the React application
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json, yarn.lock and other necessary files
COPY . .

# Install dependencies
RUN yarn || (cat /tmp/*/build.log; exit 1)

# Copy the rest of the application files
# COPY . .

# Build the application
RUN yarn build

##
## This is our secret weapon
## Our nice plugin creates a yarn install just for us
##
# RUN yarn prod-install /app/build


# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
