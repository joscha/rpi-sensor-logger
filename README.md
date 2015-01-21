# RPi sensor logger

This [resin.io](http://resin.io) based Raspberry pi node application reads temperature and humidity information from a sensor (DHT11/22 or AM2302) attached to the Raspberry pi and pushes the data to [firebase](http://www.firebase.com) in a given interval.

Borrows from [resin.io/basic-resin-node-project](https://github.com/resin-io/basic-resin-node-project) and [shaunmulligan/firebaseDTL](https://github.com/shaunmulligan/firebaseDTL).

Requirements:
* A Raspberry pi
* A DHT11, DHT22 or AM2032 sensor
* A resin.io account
* A firebase account

Environment variables you can set in your resin.io dashboard:

Required:

* `FIREBASE_URL`: The url to your firebase.
* `FIREBASE_SECRET`: The firebase secret.

Optional:

* `SENSOR_INTERVAL`: The interval (in seconds) in which to query the sensor for data. Defaults to `300` (5min).
* `SENSOR_TYPE`: The sensor type, defaults to `22`. Possible values: DHT11:  `11`, DHT22:  `22`, AM2302: `22`.
* `SENSOR_PIN`: The sensor gpio pin, defaults to `4`.
