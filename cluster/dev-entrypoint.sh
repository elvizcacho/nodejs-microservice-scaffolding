#!/bin/sh

SCRIPT_PATH=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

npm install
npm run watch


