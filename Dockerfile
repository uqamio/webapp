# Node.js app Docker file
FROM ubuntu:14.04

MAINTAINER Gabriel Com "com.gabriel@uqam.ca"

RUN apt-get update  &&  apt-get install -y \
    curl \
    build-essential \
    git \
    nano \
    ruby-full

#installation de node
RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash - &&\
    apt-get install -y nodejs

#Exécuter des commande de configuration et d'installation
RUN su -c "gem install sass" &&\
    git config --global url."https://".insteadOf git://

ADD . /usr/www
WORKDIR /usr/www

ENV NODE_ENV='development'
ENV PORT=2015
ENV REPERTOIRE_PUBLIC='./public'
ENV EMETTEUR='http://neo.dahriel.io'
ENV PROJET_USAGER_CALLBACK_URL='http://webapp.dahriel.io/authentification'

#Démarrer le site
RUN npm install npm -g &&\
    npm install forever -g &&\
    npm install

EXPOSE 2015

CMD forever -c node dist/app.js