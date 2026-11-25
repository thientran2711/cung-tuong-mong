#!/bin/bash
export NODE_PATH=$(npm root -g); cd /tmp/ts; node click.js "$@"
