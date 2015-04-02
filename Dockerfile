# Node.js app Docker file
FROM ubuntu:14.04

MAINTAINER Gabriel Com "com.gabriel@uqam.ca"

#Installer node
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install nodejs -y
RUN apt-get install build-essential -y

#Installer ruby pour sass
RUN apt-get install ruby-full -y
RUN su -c "gem install sass"

#Installer nano éditeur plus simple de vi
RUN apt-get install nano -y

ADD ./ /usr/www
WORKDIR /usr/www

ENV NODE_ENV='development'
ENV PORT=3000
ENV REPERTOIRE_PUBLIC='./public'
ENV EMETTEUR='http://neo.dahriel.io'
#Pour bower
ENV CI=true



RUN npm install npm
RUN npm install forever -g
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install
RUN bower install --allow-root --config.interactive=false

EXPOSE 3000

CMD forever -c node dist/app.js