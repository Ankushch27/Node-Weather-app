const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}
  .json?access_token=pk.eyJ1IjoiYXBwYW5rIiwiYSI6ImNrY3U5bnVoNDI0dXEyeW8yNW15ajBuazYifQ.PleNIDWp2P_yEBEfpZ3jTw`;

  request({ url, json: true }, (error, { body }) => {
    const features = body.features;
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search term.', undefined);
    } else {
      callback(undefined, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
