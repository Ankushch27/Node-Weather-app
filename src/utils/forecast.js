const request = require('request');

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b6b5391c862d259f05fbc0b1ca16dee1&query=${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      callback(undefined, `${body.current.weather_descriptions}. It is ${body.current.temperature} degrees out.`);
    }
  });
};

module.exports = forecast;
