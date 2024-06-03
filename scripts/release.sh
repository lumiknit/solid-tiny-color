#!/bin/sh
set -x

# Release for npm package

# 0. Parse arguments
# Usage: ./scripts/release.sh <version>

if [ $# -eq 0 ]; then
	echo "Usage: ./scripts/release.sh <version>"
	exit 1
fi

VERSION="$1"

# Check the version is correct semver
if ! echo "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
	echo "Invalid version: $VERSION"
	exit 1
fi

# 1. Checkout to a new branch
ORIGINAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git checkout -b "release/$VERSION"

# 2. Update version in package.json, using yq

yq eval ".version = \"$VERSION\"" package.json > package.json.tmp
mv package.json.tmp package.json
rm -f package.json.tmp

# 3. Run pnpm scripts
pnpm install
pnpm run format
pnpm run build

# 3. Commit the changes
git add package.json
git add -f dist
git commit -m "Release v$VERSION"

# 4. Push the branch and tag
git push origin "release/$VERSION"

# 5. Tag the commit
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"

# 6. pnpm publish
pnpm publish

# 7. Return to the original branch
git checkout "$ORIGINAL_BRANCH"
