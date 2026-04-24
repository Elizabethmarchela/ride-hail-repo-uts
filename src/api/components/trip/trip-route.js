/* eslint-disable prettier/prettier */
const express = require('express');

const tripsController = require('./trip-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/trip', route);

  route.post('/pickup', tripsController.pickup);

  route.put('/:tripId/assign-driver', tripsController.assignDriver);

  route.get('/ongoing/:passengerId', tripsController.getOngoingTrip);

  route.put('/:tripId/dropoff', tripsController.dropoff);
};