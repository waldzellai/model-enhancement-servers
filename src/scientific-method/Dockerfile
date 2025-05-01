FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/scientific-method/package.json ./src/scientific-method/
COPY src/scientific-method/tsconfig.json ./src/scientific-method/
COPY src/scientific-method/*.ts ./src/scientific-method/

# Install dependencies
RUN npm install

# Build the server
RUN npm run build --workspace=@waldzellai/scientific-method

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/scientific-method/dist ./dist
COPY --from=build /app/src/scientific-method/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
