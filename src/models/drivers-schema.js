module.exports = (db) =>
  db.model(
    'Drivers',
    db.Schema({
      driverName: String,
      vehiclePlate: String,
      currentLocation: {
        lat: Number,
        lng: Number,
      },
      isAvailable: { type: Boolean, default: true },
      rating: { type: Number, default: 5.0 },
      emergencyContact: String,
    })
  );
