const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

geocode.geocodeAddress(argv.a, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);
    weather.getTemperature(
      result.latitude,
      result.longitude,
      (errorMessage, weatherResult) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(weatherResult);
        }
      }
    );
  }
});
