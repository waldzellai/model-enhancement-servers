FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/collaborative-reasoning/package.json ./src/collaborative-reasoning/
COPY src/collaborative-reasoning/tsconfig.json ./src/collaborative-reasoning/
COPY src/collaborative-reasoning/*.ts ./src/collaborative-reasoning/

# Install dependencies
RUN npm install

# Build the server
RUN npm run build --workspace=@waldzellai/collaborative-reasoning

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/collaborative-reasoning/dist ./dist
COPY --from=build /app/src/collaborative-reasoning/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
