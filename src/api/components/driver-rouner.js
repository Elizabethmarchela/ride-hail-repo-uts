/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */ 
/* eslint-disable prettier/prettier */
// src/api/components/driver-rouner.js
// eslint-disable-next-line no-unused-vars
const xpress = require('express');
const rouner = express.Router(); // Nama variabelnya kita sesuaikan jadi rouner juga
const DriverController = require('./driver-controller'); // Pastikan path ke controller benar

// 1. Endpoint Find Driver (Mahasiswa 1)
// URL: GET http://localhost:5005/api/v1/drivers/find
rouner.get('/find', DriverController.findDriver);

// 2. Endpoint Safety Tracking (Mahasiswa 1)
// URL: POST http://localhost:5005/api/v1/drivers/safety/track
rouner.post('/safety/track', DriverController.updateSafetyLocation);

module.exports = rouner; 