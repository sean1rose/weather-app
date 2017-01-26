const request = require('request');
const config = require('../config');

// 0fe216f6f0bea9cb53652fb64dbe9e3d
// https://api.darksky.net/forecast/0fe216f6f0bea9cb53652fb64dbe9e3d/33.741383,-117.79436
// https://api.darksky.net/forecast/APIKEY/LAT,LNG

module.exports = {
  forecastWeather: (lat, lng, callback) => {
    // https://api.darksky.net/forecast/0fe216f6f0bea9cb53652fb64dbe9e3d/33.741383,-117.79436
    var encodedCoordinates = encodeURIComponent(lat + ',' + lng);
    request({
      url: `https://api.darksky.net/forecast/${config.key}/${encodedCoordinates}`,
      json: true
    }, (error, response, body) => {
      // *body is part of http -> it's the data that comes back
      // response has stuff about response and request => statusCode, body, headers set by server (k-v string pairs, "content-type" is an example), headers set by us, request
      if (error){
        callback('Unable to connect to Dark Sky servers...');
      }
      else if (response.statusCode === 200){
        var shortSummary = body.currently.summary;
        var temperature = body.currently.temperature;
        var apparentTemp = body.currently.apparentTemperature;
        var longSummary = body.daily.summary;
        callback(undefined, {
          shortSummary,
          temperature,
          apparentTemp,
          longSummary
        });
      }
    })
  }
}