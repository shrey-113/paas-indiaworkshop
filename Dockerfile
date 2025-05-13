FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY server/package.json server/package-lock.json* ./

# Install dependencies
RUN npm install

# Copy server files
COPY server/ ./

# Copy frontend files to public directory
COPY frontend/ ./public/

# Expose port for the application
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]