var request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      // *body is part of http -> it's the data that comes back
      // response has stuff about response and request => statusCode, body, headers set by server (k-v string pairs, "content-type" is an example), headers set by us, request
      if (error){
        reject('Unable to connect to Google Map servers...');
      }
      else if (body.status === 'ZERO_RESULTS'){
        reject('Unable to find that specific address');
      }
      else if (body.status === "OK"){
        var resultObj = {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        }
        resolve(resultObj);

      }
    });
  });
};

geocodeAddress('90210').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (err) => {
  console.log(err);
})