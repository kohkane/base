FROM node:8.10

# Install Serverless Framework globally
RUN yarn global add serverless

# Install Packages
RUN mkdir -p /usr/src/app
ADD ./package.json ./yarn.* /tmp/
RUN cd /tmp && yarn
RUN cd /usr/src/app && ln -s /tmp/node_modules

# Move packages to vendor folder
COPY ./${ROOT} ./usr/src/app
WORKDIR /usr/src/app/${ROOT}/

