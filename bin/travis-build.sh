#!/bin/bash

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

node -v
npm -v

yarn install

ls

if [ "$TRAVIS_OS_NAME" = "linux" ]; then
  yarn dist
elif [ "$TRAVIS_OS_NAME" = "osx" ]; then
  security find-identity -v -p codesigning
  yarn dist
elif [ "$TRAVIS_OS_NAME" = "windows" ]; then
  yarn dist
fi

ls dist
