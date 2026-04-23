const express = require('express');
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {

  app.post('/auth/register', authController.register);
  app.post('/auth/login', authController.login);
  app.get('/auth/getProfile', authMiddleware, authController.getProfile);
  app.get('/protected', authMiddleware, authController.testProtected);
  app.put('/auth/updateProfile', authMiddleware, authController.updateProfile);
};
