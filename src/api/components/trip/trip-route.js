
/* eslint-disable prettier/prettier */
const express = require('express');

const tripsController = require('./trip-controller');

const express = require('express');

const tripController = require('./trip-controller');


const route = express.Router();

module.exports = (app) => {
  app.use('/trip', route);

  route.post('/pickup', tripController.pickup);


  app.use('/trip', route);

  app.use('/trips', route);


  route.post('/pickup', tripsController.pickup);


  route.put('/:tripId/assign-driver', tripController.assignDriver);

  route.get('/ongoing/:passengerId', tripController.getOngoingTrip);

  route.put('/:tripId/dropoff', tripController.dropoff);
};