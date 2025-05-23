# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Generated Dockerfile for Visual Reasoning MCP Server
FROM node:lts-alpine AS build

# Create app directory
WORKDIR /app

# Copy workspace root package files and TS config
COPY package.json package-lock.json tsconfig.json ./

# Copy the Visual Reasoning package
COPY src/visual-reasoning ./src/visual-reasoning

# Install dependencies (including workspaces)
RUN npm install

# Build only the Visual Reasoning package
RUN npm run build --workspace=@waldzellai/visual-reasoning

# Runtime image
FROM node:lts-alpine AS runtime
WORKDIR /app

# Copy built dist and package.json for production install
COPY --from=build /app/src/visual-reasoning/dist ./dist
COPY --from=build /app/src/visual-reasoning/package.json ./package.json

# Only production dependencies
ENV NODE_ENV=production
RUN npm install --production --ignore-scripts

# Start the MCP server
ENTRYPOINT ["node", "dist/index.js"]
