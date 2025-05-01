FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/visual-reasoning/package.json ./src/visual-reasoning/
COPY src/visual-reasoning/tsconfig.json ./src/visual-reasoning/
COPY src/visual-reasoning/*.ts ./src/visual-reasoning/

# Install dependencies
RUN npm install

# Build the server
RUN npm run build --workspace=@waldzellai/visual-reasoning

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/visual-reasoning/dist ./dist
COPY --from=build /app/src/visual-reasoning/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
