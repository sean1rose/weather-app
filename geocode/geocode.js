const request = require('request');

module.exports = {
  geocodeAddress: (address, callback) => {
    // 1301 lombard street -> want to encode the string (so 'spaces' are replaced with '%20', etc)
    // encodeURIComponent() -> takes a string and encodes it (so spaces == %20)
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      // *body is part of http -> it's the data that comes back
      // response has stuff about response and request => statusCode, body, headers set by server (k-v string pairs, "content-type" is an example), headers set by us, request
      if (error){
        callback('Unable to connect to Google Map servers...');
      }
      else if (body.status === 'ZERO_RESULTS'){
        callback('Unable to find that specific address');
      }
      else if (body.status === "OK"){
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    })
  }
}