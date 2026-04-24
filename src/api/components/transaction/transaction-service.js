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

module.exports = {
  finalPayment,
  giveRating,
};