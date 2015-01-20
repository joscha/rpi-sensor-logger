#!/bin/sh
set -o errexit

# install BCM2385 library
bcm2385_version=1.38
rm bcm2835-$bcm2385_version.tar.gz
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-$bcm2385_version.tar.gz
tar zxvf bcm2835-$bcm2385_version.tar.gz
cd bcm2835-$bcm2385_version
./configure
make
sudo make check
sudo make install
rm -rf ./bcm2835-$bcm2385_version
echo "BCM235 library installed"
