#!/bin/bash

set -o pipefail

IMAGE=afoninsky/microdeploy:ndgk
EMAIL=edissons-admin@spair-api.iam.gserviceaccount.com
PROJECT_ID=spair-api
ZONE=us-central1-f
CLUSTER=edissons-cluster

#docker login
docker build -t ${IMAGE}:latest \
	--no-cache=true --pull=true --rm=true \
	--build-arg EMAIL=$EMAIL --build-arg PROJECT_ID=$PROJECT_ID --build-arg ZONE=$ZONE --build-arg CLUSTER=$CLUSTER \
	. | tee build.log || exit 1
#docker push ${IMAGE}:latest
#!/bin/bash

set -o pipefail

IMAGE=afoninsky/microdeploy:ndgk
EMAIL=edissons-admin@spair-api.iam.gserviceaccount.com
PROJECT_ID=spair-api
ZONE=us-central1-f
CLUSTER=edissons-cluster

#docker login
docker build -t ${IMAGE}:latest \
	--no-cache=true --pull=true --rm=true \
	--build-arg EMAIL=$EMAIL --build-arg PROJECT_ID=$PROJECT_ID --build-arg ZONE=$ZONE --build-arg CLUSTER=$CLUSTER \
	. | tee build.log || exit 1
#docker push ${IMAGE}:latest
