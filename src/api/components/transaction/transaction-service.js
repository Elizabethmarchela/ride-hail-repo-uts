const repo = require('./transaction-repository');

async function finalPayment(orderId) {
  const order = await repo.getOrderById(orderId);
  if (!order) throw new Error('Order not found');

  if (order.status !== 'completed') {
    throw new Error('Trip not completed');
  }

  if (!order.fare) {
    throw new Error('Fare not calculated yet');
  }

  const finalFare = order.fare;

  return repo.setFinalFare(orderId, finalFare);
}

async function giveRating(orderId, rating, review) {
  const order = await repo.getOrderById(orderId);
  if (!order) throw new Error('Order not found');

  if (order.status !== 'completed') {
    throw new Error('Cannot rate before trip completed');
  }

  const updatedOrder = await repo.setOrderRating(orderId, rating, review);

  const driver = await repo.getDriverById(order.driverId);

  const totalTrips = (driver.totalTrips || 0) + 1;
  const currentRating = driver.rating || 5;

  const newRating =
    (currentRating * (totalTrips - 1) + rating) / totalTrips;

  await repo.updateDriver(order.driverId, {
    rating: newRating,
    totalTrips,
  });

  return updatedOrder;
}

async function validateVoucher(code) {
  if (!code) throw new Error('Voucher code is required');

  const voucher = await repo.getVoucherByCode(code);
  
  if (!voucher) {
    throw new Error('Voucher not found');
  }

  if (voucher.status !== 'active') {
    throw new Error('Voucher is no longer active');
  }

  const currentDate = new Date();
  if (voucher.expiryDate && new Date(voucher.expiryDate) < currentDate) {
    throw new Error('Voucher has expired');
  }

  return {
    code: voucher.code,
    discountType: voucher.discountType,
    discountValue: voucher.discountValue,
    maxDiscount: voucher.maxDiscount,
    minPurchase: voucher.minPurchase
  };
}

module.exports = {
  finalPayment,
  giveRating,
  validateVoucher
};