FROM node:slim

ENV PATH "$PATH:/opt/yarn/bin"
ENV HOME=/home/app

RUN wget -qO - "https://yarnpkg.com/latest.tar.gz" | tar -xzvf- -C /opt && mv /opt/dist /opt/yarn

ADD .yarn-cache.tgz $HOME/
ADD package.json yarn.lock /tmp/

RUN yarn config set cache-folder $HOME/.yarn-cache
RUN cd /tmp && yarn

ADD . $HOME

RUN ln -snf /tmp/node_modules

WORKDIR $HOME
