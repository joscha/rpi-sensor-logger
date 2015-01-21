(function() {
  'use strict';

  /**
  * @var {Number} the interval to gather the sensor output in seconds.
  * Defaults to 5 minutes (300).
  */
  var interval = process.env.SENSOR_INTERVAL || 5*60;
  var resinDeviceUuid = process.env.RESIN_DEVICE_UUID;
  var firebaseUrl = process.env.FIREBASE_URL;
  var sensorType = process.env.SENSOR_TYPE || 22;
  var sensorPin = process.env.SENSOR_PIN || 4;
  var firebaseSecret = process.env.FIREBASE_SECRET;

  if (!firebaseSecret) {
      console.error('FIREBASE_SECRET is needed');
  }

  var FirebaseClient = require('firebase-client');
  var sensorLib = require('node-dht-sensor');
  var moment = require('moment');

  var firebase = new FirebaseClient({
      url: firebaseUrl,
      auth: firebaseSecret
  });

  var sensor = {
    initialize: function() {
      return sensorLib.initialize(parseInt(sensorType, 10), parseInt(sensorPin, 10));
    },
    read: function() {
      var data = sensorLib.read();
      var temperature = data.temperature.toFixed(2);
      var humidity = data.humidity.toFixed(2);

      if (temperature !== 0 || humidity !== 0) {
          var m = moment();

          console.log(
              m.format() + ':\n',
              '\tTemperature: ' + temperature + '°C\n',
              '\tHumidity: ' + humidity + '%'
          );

          var path = ['readings', resinDeviceUuid, m.format('YYYY/MM/DD/HH/mm/ss')].join('/');
          firebase
              .push(path, {
                  temperature: temperature,
                  humidity: humidity,
                  timestamp: Date.now()
              })
              .then(function() {
                  console.log('Written to firebase');
              })
              .fail(function(err) {
                  console.error(err);
              });
      }
      setTimeout(sensor.read, interval * 1000);
    }
  };

  if (sensor.initialize()) {
    sensor.read();
  } else {
    console.error('Failed to initialize sensor');
  }
})();
