FROM node:8.10
# Install Dependencies
RUN echo "deb http://http.debian.net/debian jessie-backports main" | \
  tee --append /etc/apt/sources.list.d/jessie-backports.list > /dev/null && \
  apt-get update -y && \
  apt-get install -t jessie-backports openjdk-8-jdk -y && \
  update-java-alternatives -s java-1.8.0-openjdk-amd64

# Install Serverless Framework globally
RUN yarn global add serverless

# Install Packages
RUN mkdir -p /usr/src/app
ADD ./package.json ./yarn.* /tmp/
RUN cd /tmp && yarn
RUN cd /usr/src/app && ln -s /tmp/node_modules

# Move packages to vendor folder
WORKDIR /usr/src/app
COPY ./ ./

CMD serverless offline start
# RUN serverless offline start -r us-east-1 --host 0.0.0.0 --noTimeout --corsDisallowCredentials false
