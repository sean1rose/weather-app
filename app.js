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
  // callback #1
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));
    var lat = results.latitude;
    var lng = results.longitude;
    console.log(results.address);
    forecast.forecastWeather(lat, lng, (errMsg, weatherResults) => {
      // callback #2
      if (errMsg) {console.log(errMsg)}
      // console.log(JSON.stringify(weatherResults, undefined, 2));
      console.log(`It's currently ${weatherResults.temperature} degrees Farenheit. It feels like ${weatherResults.apparentTemp} degrees Farenheit`);
    });
  }
});
