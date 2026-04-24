const { Orders, Drivers } = require('../models');

async function getOrderById(orderId) {
  return Orders.findById(orderId);
}

async function setFinalFare(orderId, finalFare) {
  return Orders.findByIdAndUpdate(
    orderId,
    { finalFare },
    { new: true }
  );
}

async function setOrderRating(orderId, rating, review) {
  return Orders.findByIdAndUpdate(
    orderId,
    { rating, review },
    { new: true }
  );
}

async function getDriverById(driverId) {
  return Drivers.findById(driverId);
}

async function updateDriver(driverId, data) {
  return Drivers.findByIdAndUpdate(driverId, data, { new: true });
}

module.exports = {
  getOrderById,
  setFinalFare,
  setOrderRating,
  getDriverById,
  updateDriver,
};