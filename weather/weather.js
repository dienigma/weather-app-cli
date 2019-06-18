const request = require("request");
const key = require("../key");
module.exports = {
  getTemperature: (lat, lng, callback) => {
    request(
      {
        url: `https://api.darksky.net/forecast/${
          key.weather_key
        }/${lat},${lng}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          callback("unable to connect to servers");
        } else {
          callback(JSON.stringify(body.currently.temperature, undefined, 2));
        }
      }
    );
  }
};
