const express = require('express');

const auth = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const payment = require('./components/payment/payment-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  users(app);
  payment(app);

  return app;
};
