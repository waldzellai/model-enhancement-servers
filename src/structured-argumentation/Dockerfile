FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/structured-argumentation/package.json ./src/structured-argumentation/
COPY src/structured-argumentation/tsconfig.json ./src/structured-argumentation/
COPY src/structured-argumentation/*.ts ./src/structured-argumentation/

# Install dependencies
RUN npm install

# Build the server
RUN npm run build --workspace=@waldzellai/structured-argumentation

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/structured-argumentation/dist ./dist
COPY --from=build /app/src/structured-argumentation/package.json ./

ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
