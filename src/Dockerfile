# Use an official Node runtime as a base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the application
RUN npm run build

# Use Nginx as a lightweight production server
FROM nginx:alpine

# Copy the build output from the build stage to the nginx public directory
COPY --from=build ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
