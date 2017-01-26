const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

// obj that saves final parsed output (takes input from processed variable and passes it thru yargs)
  // at command line, want user to type: 
    // node app.js --address '1301 lombard st'
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    var lat = results.latitude;
    var lng = results.longitude;
    forecast.forecastWeather(lat, lng, (errMsg, data) => {
      if (errMsg) {console.log(errMsg)}
      console.log(JSON.stringify(data, undefined, 2));
    });
  }
});

// 0fe216f6f0bea9cb53652fb64dbe9e3d
// https://api.darksky.net/forecast/0fe216f6f0bea9cb53652fb64dbe9e3d/33.741383,-117.79436
// https://api.darksky.net/forecast/APIKEY/LAT,LNG

// request({
//   url: `https://api.darksky.net/forecast/0fe216f6f0bea9cb53652fb64dbe9e3d/33.741383,-117.79436`,
//   json: true
// }, (err, res, body) => {
//   console.log('current temp is - ', body.currently.temperature);
// })