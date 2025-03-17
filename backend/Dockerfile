# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend app
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
