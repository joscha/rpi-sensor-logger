FROM resin/rpi-nodejs

ENV BCM2385_VERSION=1.38
ADD http://www.airspayce.com/mikem/bcm2835/bcm2835-$BCM2385_VERSION.tar.gz /tmp/bcm2835.tar.gz
RUN tar zxvf /tmp/bcm2835.tar.gz && cd /tmp/bcm2835 && ./configure && make && make install
