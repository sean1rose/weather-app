// const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
  }
});