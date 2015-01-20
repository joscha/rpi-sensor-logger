# RPi sensor logger

Based on [Resin.io](http://resin.io).

Environment variables you can set in your resin.io dashboard:

* `SENSOR_INTERVAL`: The interval (in seconds) in which to query the sensor for data.
* `FIREBASE_URL`: The url to your firebase
* `SENSOR_TYPE`: The sensor type, defaults to `22`
* `SENSOR_PIN`: The sensor gpio pin, defaults to `4`
