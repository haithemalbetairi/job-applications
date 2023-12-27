# Use an official Node runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server files to the container
COPY . .

# Expose the port that your Express server is running on
EXPOSE 3001

# Start the Express server
CMD ["node", "index.js"]
