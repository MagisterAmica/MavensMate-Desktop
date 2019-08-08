#!/bin/bash

set -e # Automatic exit on any failure
set -x # Print commands after they are expanded but before they are executed

OS="${TRAVIS_OS_NAME}"
ACTION="build"

if [ -z "${OS}" ]; then
  echo "OS is unset, defaulting to linux"
  OS="linux"
fi

if ! [ -z "${GH_TOKEN}" ]; then
  ACTION="dist"
fi

node -v
npm -v

yarn install

if [ "${OS}" = "linux" ]; then
  echo "running linux build"
  yarn "${ACTION}"
elif [ "${OS}" = "osx" ]; then
  echo "running osx build"
  security find-identity -v -p codesigning
  yarn "${ACTION}"
elif [ "${OS}" = "windows" ]; then
  echo "running windows build"
  yarn "${ACTION}"
fi

ls dist
