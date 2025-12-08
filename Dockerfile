# Node.js 
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
# Use npm ci for reproducible builds (instead of npm install)
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port (use the port your Express app uses)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]