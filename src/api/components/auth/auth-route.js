const express = require('express');
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/register', authController.register);
  route.post('/login', authController.login);
  route.get('/getProfile', authMiddleware, authController.getProfile);
  route.get('/protected', authMiddleware, authController.testProtected);
  route.put('/updateProfile', authMiddleware, authController.updateProfile);
};
