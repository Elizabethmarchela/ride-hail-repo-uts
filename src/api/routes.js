const express = require('express');

const auth = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const transaction = require('./components/transaction/transaction-route');
const trips = require('./components/trips/trips-route');


module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  users(app);
  transaction(app);
  trips(app);

  return app;
};
