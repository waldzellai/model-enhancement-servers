FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy tsconfig.json and source code
COPY tsconfig.json ./
COPY *.ts ./

# Build TypeScript code
RUN npm run build

# Set user to non-root
USER node

# Set entrypoint to the server
ENTRYPOINT ["node", "dist/index.js"]