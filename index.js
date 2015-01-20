(function() {
  'use strict';

  /**
  * @var {Number} the interval to gather the sensor output in seconds.
  * Defaults to 5 minutes (300).
  */
  var interval = process.env.SENSOR_INTERVAL || 5*60;

  var sensorLib = require('node-dht-sensor');

  var sensor = {
    initialize: function() {
      return sensorLib.initialize(22, 4);
    },
    read: function() {
      var readout = sensorLib.read();
      console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
      'humidity: ' + readout.humidity.toFixed(2) + '%');
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
