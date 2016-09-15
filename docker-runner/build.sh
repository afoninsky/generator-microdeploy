#!/bin/bash

set -o pipefail

IMAGE=afoninsky/microdeploy
NODE_VERSION=6.5.0
IMAGE_VERSION=latest

#docker login
docker build -t ${IMAGE}:latest --build-arg NODE_VERSION=${NODE_VERSION} --no-cache=true . | tee build.log || exit 1
docker push ${IMAGE}:${IMAGE_VERSION}
