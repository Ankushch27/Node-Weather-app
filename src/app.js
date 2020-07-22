const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ankush',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ankush',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ankush',
    message: 'Help message',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.search;
  if (!address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('pageNotFound', {
    title: '404 Help',
    name: 'Ankush',
    errorMsg: 'Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('pageNotFound', {
    title: '404',
    name: 'Ankush',
    errorMsg: 'Error 404. Page not found!',
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
