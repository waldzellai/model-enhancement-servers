FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/analogical-reasoning/package.json ./src/analogical-reasoning/
COPY src/analogical-reasoning/tsconfig.json ./src/analogical-reasoning/
COPY src/analogical-reasoning/*.ts ./src/analogical-reasoning/

# Install dependencies
RUN npm install

# Build the server
RUN npm run build --workspace=@waldzellai/analogical-reasoning

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/analogical-reasoning/dist ./dist
COPY --from=build /app/src/analogical-reasoning/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
