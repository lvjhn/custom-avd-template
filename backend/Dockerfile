FROM ubuntu:22.04

ENV NAME=custom-avd-template

RUN mkdir /home/$NAME.backend
# create working directory

WORKDIR /home/${NAME}.backend
RUN mkdir /usr/local/nvm

ENV HOME /root
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 20.14.0

# update package manager
RUN apt update 

# install virtual environment 
RUN apt install -y python3

# install curl 
RUN apt -y install curl 

# install node.js 
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default && \ 
    npm install -g nodemon

# export paths
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

# set up entry point 
RUN mkdir ./utils/
RUN touch ./utils/start.sh
ENTRYPOINT ["bash", "utils/start.sh"]
