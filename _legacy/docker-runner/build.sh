#!/bin/bash

set -o pipefail

IMAGE=afoninsky/microdeploy

#docker login
docker build -t ${IMAGE}:latest --no-cache=true --pull=true --rm=true . | tee build.log || exit 1
# docker build -t ${IMAGE}:latest . | tee build.log || exit 1
#docker push ${IMAGE}:latest
