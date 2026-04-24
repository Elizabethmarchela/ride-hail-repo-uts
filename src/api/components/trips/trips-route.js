const express = require('express');

const tripsController = require('./trips-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/trips', route);

  route.post('/pickup', tripsController.pickup);

  route.put('/:tripId/assign-driver', tripsController.assignDriver);

  route.get('/ongoing/:passengerId', tripsController.getOngoingTrip);

  route.put('/:tripId/dropoff', tripsController.dropoff);

  route.post('/calculate-fare', tripsController.calculateFare);
};
