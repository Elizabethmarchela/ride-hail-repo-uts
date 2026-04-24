const { Trip } = require('../../../models');

async function findActiveTripByPassenger(passengerId) {
  return Trip.findOne({
    passengerId,
    status: { $in: ['pending', 'on_way'] },
  });
}

async function createTrip(tripData) {
  return Trip.create(tripData);
}

async function findTripById(tripId) {
  return Trip.findById(tripId);
}

async function assignDriverToTrip(tripId, driverId, driverName) {
  return Trip.findByIdAndUpdate(
    tripId,
    { driverId, driverName, status: 'on_way' },
    { new: true }
  );
}

async function completeTrip(tripId, dropoffTime) {
  return Trip.findByIdAndUpdate(
    tripId,
    { status: 'completed', dropoffTime },
    { new: true }
  );
}

module.exports = {
  findActiveTripByPassenger,
  createTrip,
  findTripById,
  assignDriverToTrip,
  completeTrip,
};
