const express = require('express');

const route = express.Router();
const controller = require('./transaction-controller');

module.exports = (app) => {
  app.use('/transaction', route);

  route.post('/final-payment', controller.finalPayment);
  route.post('/rating', controller.rating);
};
