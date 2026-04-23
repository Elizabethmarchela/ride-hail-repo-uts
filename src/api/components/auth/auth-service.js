/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { Users } = require('../../../models');
const authRepository = require('./auth-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

async function registerUser(userData) {
  const existingUser = await Users.findOne({ 
    email: userData.email 
  });
  if (existingUser) throw new Error('Email sudah digunakan');

  const newUser = new Users({
    fullName: userData.name,
    email: userData.email,
    password: await hashPassword(userData.password),
  });

  return newUser.save();
}

async function updateUser(userId, data) {
  const updateData = {};

  if (data.name) updateData.fullName = data.name;
  if (data.email) updateData.email = data.email;

  return Users.findByIdAndUpdate(userId, updateData, { new: true });
}

function generateToken(id, email) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    id,
    email,
    timestamp: Date.now(),
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserByEmail(email);

  const userPass = user ? user.password : '<RANDOM>';
  const loginPassed = await passwordMatched(password, userPass);

  if (user && loginPassed) {
    return {
      id: user._id,
      email: user.email,
      token: generateToken(user._id, user.email),
    };
  }

  return null;
}

module.exports = {
  checkLogin,
  registerUser,
  updateUser,
};
