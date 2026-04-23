const express = require('express');

const authRoute = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  authRoute(app);
  books(app);
  users(app);

  return app;
};
