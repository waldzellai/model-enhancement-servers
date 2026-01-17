FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY tsconfig.json ./
COPY loops/ ./loops/
COPY knowledge/ ./knowledge/
COPY index.ts ./
RUN npm run build

# Run
CMD ["node", "dist/index.js"]
