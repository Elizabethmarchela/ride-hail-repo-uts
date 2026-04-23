module.exports = (db) =>
  db.model(
    'Orders',
    db.Schema({
      userId: { type: db.Schema.Types.ObjectId, ref: 'Users' },
      driverId: { type: db.Schema.Types.ObjectId, ref: 'Drivers' },
      pickupLocation: String,
      destination: String,
      fare: Number,
      status: {
        type: String,
        enum: ['pending', 'on_way', 'arrived', 'completed', 'cancelled'],
        default: 'pending',
      },
      otpValidation: String,
      createdAt: { type: Date, default: Date.now },
    })
  );
