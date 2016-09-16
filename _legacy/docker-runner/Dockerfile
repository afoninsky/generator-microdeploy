FROM ubuntu:latest

MAINTAINER Andrey Afoninsky

ARG EMAIL
ARG PROJECT_ID
ARG ZONE
ARG CLUSTER

RUN apt-get -qq update && apt-get install -y curl python

# nodejs
RUN curl -SLO https://nodejs.org/dist/v6.5.0/node-v6.5.0-linux-x64.tar.gz \
  && tar -xzf node-v6.5.0-linux-x64.tar.gz -C /usr/local --strip-components=1 \
  && rm node-v6.5.0-linux-x64.tar.gz

# docker
RUN curl -sSL https://get.docker.com | sh

# gcloud/kubectl
ENV PATH="/root/google-cloud-sdk/bin:${PATH}"
ENV CREDENTIALS="/root/.config/gcloud/application_default_credentials.json"

RUN curl -SLO https://dl.google.com/dl/cloudsdk/release/install_google_cloud_sdk.bash \
  && bash install_google_cloud_sdk.bash --disable-prompts \
  && yes | gcloud components install kubectl

COPY google.json $CREDENTIALS

# `node -p 'require(process.argv[1]).client_email' $CREDENTIALS`
# `node -p 'require(process.argv[1]).project_id' $CREDENTIALS`

RUN gcloud auth activate-service-account $EMAIL --key-file $CREDENTIALS \
  && gcloud config set project $PROJECT_ID \
  && gcloud config set compute/zone $ZONE \
  && gcloud container clusters get-credentials $CLUSTER
