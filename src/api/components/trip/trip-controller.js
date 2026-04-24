const tripService = require('./trip-service');


/* eslint-disable no-underscore-dangle */
const tripsService = require('./trip-service');

const tripsService = require('./trips-service');

const { errorResponder, errorTypes } = require('../../../core/errors');

async function pickup(request, response, next) {
  try {

    const { passengerId, passengerName, pickupLocation, destination } =
      request.body;

    if (!passengerId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Passenger id is required'
      );
    }
    if (!passengerName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Passenger name is required'
      );
    }
    if (!pickupLocation) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Pickup location is required'
      );
    }
    if (!destination) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Destination is required'
      );
    }

    const trip = await tripsService.pickup(
      passengerId,
      passengerName,
      pickupLocation,
      destination
    );

    const { passengerId, passengerName, pickupLocation, destination } = request.body;

    if (!passengerId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Passenger id is required');
    }
    if (!passengerName) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Passenger name is required');
    }
    if (!pickupLocation) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Pickup location is required');
    }
    if (!destination) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Destination is required');
    }

    const trip = await tripService.pickup(passengerId, passengerName, pickupLocation, destination);

    return response.status(201).json({
      success: true,
      message: 'Pickup request created successfully',
      data: {
        tripId: trip._id,
        status: trip.status,
        pickupLocation: trip.pickupLocation,
        destination: trip.destination,

        pickupTime: trip.pickupTime,
      },
    });
  } catch (error) {
    if (error.message === 'ACTIVE_TRIP_EXISTS') {
      return next(
        errorResponder(errorTypes.VALIDATION_ERROR, 'You have an active trip')
      );

        pickupTime: trip.pickupTime
      }
    });
  } catch (error) {
    if (error.message === 'ACTIVE_TRIP_EXISTS') {
      return next(errorResponder(errorTypes.VALIDATION_ERROR, 'You have an active trip'));

    }
    return next(error);
  }
}

async function assignDriver(request, response, next) {
  try {
    const { tripId } = request.params;
    const { driverId, driverName } = request.body;

    if (!tripId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Trip id is required');
    }
    if (!driverId) {

      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Driver id is required'
      );
    }
    if (!driverName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Driver name is required'
      );

      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Driver id is required');
    }
    if (!driverName) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Driver name is required');

    }

    const trip = await tripService.assignDriver(tripId, driverId, driverName);

    return response.status(200).json({
      success: true,
      message: 'Driver assigned successfully',
      data: {
        tripId: trip._id,
        driverId: trip.driverId,
        driverName: trip.driverName,

        status: trip.status,
      },

        status: trip.status
      }

    });
  } catch (error) {
    if (error.message === 'TRIP_NOT_FOUND') {
      return next(errorResponder(errorTypes.NOT_FOUND, 'Trip not found'));
    }
    if (error.message === 'TRIP_NOT_AVAILABLE') {

      return next(
        errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Trip not available for driver assignment'
        )
      );

      return next(errorResponder(errorTypes.VALIDATION_ERROR, 'Trip not available for driver assignment'));

    }
    return next(error);
  }
}

async function getOngoingTrip(request, response, next) {
  try {
    const { passengerId } = request.params;

    if (!passengerId) {

      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Passenger id is required'
      );

      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Passenger id is required');

    }

    const trip = await tripService.getOngoingTrip(passengerId);

    if (!trip) {
      return response.status(200).json({
        success: true,
        message: 'No ongoing trip found',

        data: null,

        data: null

      });
    }

    return response.status(200).json({
      success: true,
      message: 'Ongoing trip found',
      data: {
        tripId: trip._id,
        status: trip.status,
        passengerId: trip.passengerId,
        passengerName: trip.passengerName,
        driverId: trip.driverId,
        driverName: trip.driverName,
        pickupLocation: trip.pickupLocation,
        destination: trip.destination,

        pickupTime: trip.pickupTime,
      },

        pickupTime: trip.pickupTime
      }

    });
  } catch (error) {
    return next(error);
  }
}

async function dropoff(request, response, next) {
  try {
    const { tripId } = request.params;

    if (!tripId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Trip id is required');
    }

    const completedTrip = await tripService.dropoff(tripId);

    return response.status(200).json({
      success: true,
      message: 'Trip completed successfully',
      data: {
        tripId: completedTrip._id,
        status: completedTrip.status,

        dropoffTime: completedTrip.dropoffTime,
      },

        dropoffTime: completedTrip.dropoffTime
      }

    });
  } catch (error) {
    if (error.message === 'TRIP_NOT_FOUND') {
      return next(errorResponder(errorTypes.NOT_FOUND, 'Trip not found'));
    }
    if (error.message === 'TRIP_ALREADY_COMPLETED') {

      return next(
        errorResponder(errorTypes.VALIDATION_ERROR, 'Trip already completed')
      );
    }
    if (error.message === 'TRIP_NOT_PICKED_UP') {
      return next(
        errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Passenger has not been picked up yet'
        )
      );

      return next(errorResponder(errorTypes.VALIDATION_ERROR, 'Trip already completed'));
    }
    if (error.message === 'TRIP_NOT_PICKED_UP') {
      return next(errorResponder(errorTypes.VALIDATION_ERROR, 'Passenger has not been picked up yet'));

    }
    return next(error);
  }
}

module.exports = {
  pickup,
  assignDriver,
  getOngoingTrip,

  dropoff,
};

  dropoff
};
