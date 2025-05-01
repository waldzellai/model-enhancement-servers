FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/metacognitive-monitoring/package.json ./src/metacognitive-monitoring/
COPY src/metacognitive-monitoring/tsconfig.json ./src/metacognitive-monitoring/
COPY src/metacognitive-monitoring/*.ts ./src/metacognitive-monitoring/

# Install dependencies
RUN npm install

# Build the server
RUN npm run build --workspace=@waldzellai/metacognitive-monitoring

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/metacognitive-monitoring/dist ./dist
COPY --from=build /app/src/metacognitive-monitoring/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
