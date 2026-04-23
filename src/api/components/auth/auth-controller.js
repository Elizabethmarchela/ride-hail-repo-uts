/* eslint-disable no-underscore-dangle */
const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { updateUser } = require('../users/users-repository');

async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    const loginResult = await authService.checkLogin(email, password);

    if (!loginResult) {
      return response.status(401).json({
        message: 'Wrong email or password',
      });
    }

    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}
async function getProfile(req, res) {
  try {
    const user = req.user;
    res.status(200).json({
      message: 'Berhasil mengambil data profil',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil profil' });
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Nama, email, dan password harus diisi.',
      });
    }

    const newUser = await authService.registerUser({ name, email, password });

    return res.status(201).json({
      message: 'User berhasil didaftarkan',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.message === 'Email sudah digunakan') {
      return res.status(400).json({ message: error.message });
    }

    // eslint-disable-next-line no-console
    console.error('Error saat register:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    const updatedUser = await authService.updateUser(userId, { name, email });

    return res.status(200).json({
      message: 'Profil berhasil diperbarui',
      data: {
        id: updatedUser._id,
        name: updatedUser.fullName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('ERROR UPDATE PROFILE:', error);
    return res.status(500).json({
      message: 'Gagal update profil',
      error: error.message,
    });
  }
}

async function testProtected(request, response, next) {
  try {
    return response.status(200).json({ message: 'OK' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
  testProtected,
  getProfile,
  register,
  updateProfile,
};
