const request = require("request");
const key = require("../key");

const geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${
        key.api_key
      }&address=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback(`Google cannot connect to the servers`);
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find that address");
      } else if (body.status === "OK") {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};
// de36469b9816fdcca99d9e9d9e06ed4a
module.exports.geocodeAddress = geocodeAddress;
