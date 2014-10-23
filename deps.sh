#!/bin/bash

set -o errexit

apt-get -q update
apt-get install -y cowsay
cowsay "install Raspbian dependencies using deps.sh"
