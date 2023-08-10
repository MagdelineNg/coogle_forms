# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install app dependencies
RUN npm install

# Copy the contents of the src/backend directory to the container
COPY . .

# Expose the ports that the app will use
EXPOSE 9000

# Start the backend app
CMD ["node", "app.js"]