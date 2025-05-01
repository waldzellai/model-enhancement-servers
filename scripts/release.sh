#!/bin/bash

# Script to create a new release of the servers

# Get the new version number
if [ -z "$1" ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 0.2.0"
  exit 1
fi

NEW_VERSION=$1
SERVERS_DIR="./src"

# Update the version in the root package.json
sed -i '' "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" "./package.json"
echo "✅ Updated root package.json version to $NEW_VERSION"

# Update the version in each server package.json
for server_dir in "$SERVERS_DIR"/*; do
  if [ -d "$server_dir" ]; then
    pkg_file="$server_dir/package.json"
    if [ -f "$pkg_file" ]; then
      sed -i '' "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" "$pkg_file"
      echo "✅ Updated $(basename "$server_dir") package.json version to $NEW_VERSION"
    fi
  fi
done

# Build all packages
echo "Building all packages..."
npm run build

# Create a git tag for the release
git add .
git commit -m "Release v$NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo "Release v$NEW_VERSION prepared!"
echo "To push the release to GitHub, run: git push && git push --tags"
echo "To publish the packages to npm, run: npm run publish-all"