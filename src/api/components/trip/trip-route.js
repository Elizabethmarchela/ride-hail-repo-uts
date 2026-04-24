const express = require('express');

const tripController = require('./trip-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/trip', route);

  route.post('/pickup', tripController.pickup);

  route.put('/:tripId/assign-driver', tripController.assignDriver);

  route.get('/ongoing/:passengerId', tripController.getOngoingTrip);

  route.put('/:tripId/dropoff', tripController.dropoff);
};