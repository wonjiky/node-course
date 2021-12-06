const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=70d8cf51242b9c54daf77082c28f3b74&query=${lon},${lat}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to data service", undefined);
    } else if (body.error) {
      callback("Unable to find", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. The current temperature is ${data.temperature}. It feels like ${data.feelslike} degrees outside.`
      );
    }
  });
};

module.exports = forecast;
