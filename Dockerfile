FROM resin/rpi-nodejs

RUN apt-get update

ADD . /App

RUN cd /App && npm install --unsafe-perm

WORKDIR /App

CMD ["npm", "start"]