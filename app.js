const request = require("request");
const yargs = require("yargs");
const key = require("./key");
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch for weather app.",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var encodedAddress = encodeURIComponent(argv.a);

request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${
      key.api_key
    }&address=${encodedAddress}`,
    json: true
  },
  (error, response, body) => {
    if (error) {
      console.log(`Google cannot connect to the servers`);
    } else if (body.status === "ZERO_RESULTS") {
      console.log("Unable to find that address");
    } else if (body.status === "OK") {
      console.log(`Address: ${body.results[0].formatted_address}
        Latitude : ${body.results[0].geometry.location.lat}
        Longitude : ${body.results[0].geometry.location.lng}
        `);
    }
  }
);
