const service = require('./transaction-service');

async function finalPayment(req, res) {
  try {
    const { orderId } = req.body;

    const result = await service.finalPayment(orderId);

    res.json({
      message: 'Final payment calculated',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function rating(req, res) {
  try {
    const { orderId, rating, review } = req.body;

    const result = await service.giveRating(
      orderId,
      rating,
      review
    );

    res.json({
      message: 'Rating submitted',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  finalPayment,
  rating,
};