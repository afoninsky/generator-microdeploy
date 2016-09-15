FROM ubuntu:latest

RUN apt-get -qq update && apt-get install -y curl python

# nodejs
RUN curl -SLO https://nodejs.org/dist/v6.5.0/node-v6.5.0-linux-x64.tar.gz \
  && tar -xzf node-v6.5.0-linux-x64.tar.gz -C /usr/local --strip-components=1 \
  && rm node-v6.5.0-linux-x64.tar.gz

# docker
RUN curl -sSL https://get.docker.com | sh

# gcloud/kubectl
ENV PATH="/root/google-cloud-sdk/bin:${PATH}"
RUN curl -SLO https://dl.google.com/dl/cloudsdk/release/install_google_cloud_sdk.bash \
  && bash install_google_cloud_sdk.bash --disable-prompts --install-dir=/root \
  && yes | gcloud components install kubectl

COPY google.json ~/.config/gcloud/application_default_credentials.json

RUN gcloud auth activate-service-account `node -p 'require("/root/.config/gcloud/application_default_credentials.json").client_email'` --key-file  ~/.config/gcloud/application_default_credentials.json \
  && gcloud docker --authorize-only \
#  cp /root/google.json ~/.config/gcloud/application_default_credentials.json
  && gcloud config set project `node -p 'require("/root/google.json").project_id'` \
  && gcloud config set compute/zone us-central1-f \
  && gcloud container clusters get-credentials edissons-cluster

RUN rm /root/google.json
