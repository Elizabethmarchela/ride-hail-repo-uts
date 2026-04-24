const tripsRepository = require('./trips-repository');

async function pickup(passengerId, passengerName, pickupLocation, destination) {
  if (!passengerId) throw new Error('PASSENGER_ID_REQUIRED');
  if (!passengerName) throw new Error('PASSENGER_NAME_REQUIRED');
  if (!pickupLocation) throw new Error('PICKUP_LOCATION_REQUIRED');
  if (!destination) throw new Error('DESTINATION_REQUIRED');
  if (!fare) throw new Error('FARE_REQUIRED');

  const activeTrip = await tripsRepository.findActiveTripByPassenger(passengerId);
  if (activeTrip) throw new Error('ACTIVE_TRIP_EXISTS');

  const tripData = {
    passengerId,
    passengerName,
    pickupLocation,
    destination,
    fare,
    status: 'pending',
    pickupTime: new Date()
  };

  return tripsRepository.createTrip(tripData);
}

async function assignDriver(tripId, driverId, driverName) {
  const trip = await tripsRepository.findTripById(tripId);
  if (!trip) throw new Error('TRIP_NOT_FOUND');
  if (trip.status !== 'pending') throw new Error('TRIP_NOT_AVAILABLE');

  return tripsRepository.assignDriverToTrip(tripId, driverId, driverName);
}

async function getOngoingTrip(passengerId) {
  if (!passengerId) throw new Error('PASSENGER_ID_REQUIRED');
  return tripsRepository.findActiveTripByPassenger(passengerId);
}

async function dropoff(tripId) {
  const trip = await tripsRepository.findTripById(tripId);
  if (!trip) throw new Error('TRIP_NOT_FOUND');
  if (trip.status === 'completed') throw new Error('TRIP_ALREADY_COMPLETED');
  if (trip.status !== 'on_way') throw new Error('TRIP_NOT_PICKED_UP');

  return tripsRepository.completeTrip(tripId, new Date());
}

async function calculateFare(pickupLocation, destination) {
  if (!pickupLocation) throw new Error('PICKUP_LOCATION_REQUIRED');
  if (!destination) throw new Error('DESTINATION_REQUIRED');

  const mockDistanceKm = Math.floor(Math.random() * 15) + 1;
  
  const baseFare = 10000;
  const perKmRate = 2500; 

  const estimatedFare = baseFare + (mockDistanceKm * perKmRate);

  return {
    pickupLocation,
    destination,
    distanceKm: mockDistanceKm,
    estimatedFare
  };
}

module.exports = {
  pickup,
  assignDriver,
  getOngoingTrip,
  dropoff,
  calculateFare
};