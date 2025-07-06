# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first to cache layer
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app using built JavaScript (assuming dist/index.js)
CMD ["node", "dist/index.js"]
