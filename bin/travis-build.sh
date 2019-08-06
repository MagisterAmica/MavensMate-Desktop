#!/bin/sh

set -e
set -x

if [ -z "$TRAVIS_OS_NAME" ]; then
  echo "TRAVIS_OS_NAME is unset, defaulting to linux"
  TRAVIS_OS_NAME="linux"
fi

if [ "$TRAVIS_OS_NAME" = "linux" ]; then
  echo "running linux build"
elif [ "$TRAVIS_OS_NAME" = "osx" ]; then
  echo "running osx build"
elif [ "$TRAVIS_OS_NAME" = "windows" ]; then
  echo "running windows build"
fi

# next two lines required for proper build
npm install node-gyp-install
node_modules/.bin/node-gyp-install

node -v
npm -v

npm install

ls

if [ "$TRAVIS_OS_NAME" = "linux" ]; then
  npm run-script dist:linux:x64
elif [ "$TRAVIS_OS_NAME" = "osx" ]; then
  security find-identity -v -p codesigning
  npm run dist:darwin:x64
elif [ "$TRAVIS_OS_NAME" = "windows" ]; then
  npm run dist:win32:x64
fi

ls dist
