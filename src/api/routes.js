const express = require('express');

const auth = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const trip = require('./components/trip/trip-route');
const transaction = require('./components/transaction/transaction-route');



module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  users(app);
  trip(app);
  transaction(app);


  return app;
};
