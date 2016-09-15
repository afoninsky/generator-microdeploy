FROM ubuntu:latest

RUN apt-get -qq update && apt-get install -y curl

# nodejs
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v6.5.0-linux-x64.tar.gz" \
  && tar -xJf "node-v6.5.0-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v6.5.0-linux-x64.tar.gz"

# docker
RUN curl -sSL https://get.docker.com | sh

# gcloud/kubectl
RUN wget https://dl.google.com/dl/cloudsdk/release/install_google_cloud_sdk.bash \
  && bash install_google_cloud_sdk.bash --disable-prompts \
  && yes | google-cloud-sdk/bin/gcloud components install beta kubectl docker-credential-gcr
#  && yes | google-cloud-sdk/bin/gcloud components install beta kubectl docker-credential-gcr
COPY google.json /tmp/google.json
RUN google-cloud-sdk/bin/gcloud auth activate-service-account edissons-admin@spair-api.iam.gserviceaccount.com --key-file /tmp/google.json \
  && google-cloud-sdk/bin/gcloud beta auth application-default activate-service-account --key-file /tmp/google.json \
# && google-cloud-sdk/bin/gcloud docker --authorize-only \
  && google-cloud-sdk/bin/gcloud config set project spair-api \
  && google-cloud-sdk/bin/gcloud config set compute/zone us-central1-f \
  && google-cloud-sdk/bin/gcloud container clusters get-credentials edissons-cluster

ENV PATH="/home/jenkins/google-cloud-sdk/bin:${PATH}"
RUN rm /tmp/google.json
