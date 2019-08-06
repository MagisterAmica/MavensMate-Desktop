#!/bin/sh

set -e
set -x

if [ "$TRAVIS_OS_NAME" = "linux" -o -z "$TRAVIS_OS_NAME" ]; then
  echo running linux build
  sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
  sudo apt-get -y update -qq
  sudo apt-get -y -qq install g++-4.8
  g++ -v
  sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 90
  g++ -v
  sudo apt-get -y install node-gyp
  sudo apt-get -y install gnome-keyring
  sudo apt-get -y install libgnome-keyring-dev
  npm config set python /usr/bin/python2 -g
  sudo apt-get -y install --no-install-recommends -y icnsutils graphicsmagick xz-utils
elif [ "$TRAVIS_OS_NAME" = "osx" ]; then
  echo running osx build
elif [ "$TRAVIS_OS_NAME" = "windows" ]; then
  echo running windows build
fi

# next two lines required for proper build
npm install -g node-gyp-install
node-gyp-install

node -v
npm -v

npm install

./node_modules/.bin/electron-rebuild --module-dir app/node_modules
ls

node bin/clean.js

#if OS is linux or is not set
if [ "$TRAVIS_OS_NAME" = "linux" -o -z "$TRAVIS_OS_NAME" ]; then
  npm run-script dist:linux:x64
elif [ "$TRAVIS_OS_NAME" = "osx" ]; then
  security find-identity -v -p codesigning
  npm run dist:darwin:x64
elif [ "$TRAVIS_OS_NAME" = "windows" ]; then
  npm run dist:win32:x64
fi

ls dist
