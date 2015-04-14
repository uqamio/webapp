# Node.js app Docker file
FROM ubuntu:14.04

MAINTAINER Gabriel Com "com.gabriel@uqam.ca"

#Installer node
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install nodejs -y
RUN apt-get install build-essential -y
RUN apt-get install git -y

#Installer ruby pour sass
RUN apt-get install ruby-full -y
RUN su -c "gem install sass"

#Installer nano éditeur plus simple de vi
RUN apt-get install nano -y

ADD ./ /usr/www
WORKDIR /usr/www

VOLUME /var/securite/certs
VOLUME /var/securite/uqam/certs/

ENV NODE_ENV='development'
ENV PORT=2015
ENV REPERTOIRE_PUBLIC='./public'
ENV EMETTEUR='http://neo.dahriel.io'
ENV PROJET_USAGER_CALLBACK_URL='http://webapp.dahriel.io/authentification'

#Pour bower
ENV CI=true
#Sinon on ne pourra pas télécharger
RUN git config --global url."https://".insteadOf git://

RUN npm install npm -g
RUN npm install forever -g
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install
RUN bower install --allow-root --config.interactive=false

EXPOSE 2015

CMD forever -c node dist/app.js