module.exports = (db) =>
  db.model(
    'Vouchers',
    db.Schema({
      code: { type: String, unique: true, required: true },
      discountType: { type: String, enum: ['percentage', 'flat'], default: 'flat' },
      discountValue: { type: Number, required: true }, 
      maxDiscount: { type: Number, default: 0 }, 
      minPurchase: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
      },
      expiryDate: Date,
      createdAt: { type: Date, default: Date.now },
    })
  );