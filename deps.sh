#!/bin/bash

set -o errexit

apt-get -q update
apt-get install -y cowsay
/usr/games/cowsay "Install dependencies using a script like this!"
