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
      return sensorLib.initialize(sensorType, sensorPin);
    },
    read: function() {
      var readout = sensorLib.read();
      var temperature = readout.temperature.toFixed(2);
      var humidity = readout.humidity.toFixed(2);

      console.log(moment().format(), 'Temperature: ' + temperature + 'C, ' +
      'humidity: ' + humidity + '%');

      var path = '/' + [deviceName, 'readings'].join('/');
      firebase
          .push(path, {
              temperature: temperature,
              humidity: humidity,
              timestamp: Firebase.ServerValue.TIMESTAMP
          })
          .then(function() {
              console.log('Written data to firebase');
          })
          .fail(function(err) {
              console.error(err);
          });

      setTimeout(function() {
        sensor.read();
      }, interval * 1000);
    }
  };

  if (sensor.initialize()) {
    sensor.read();
  } else {
    console.error('Failed to initialize sensor');
  }
})();
