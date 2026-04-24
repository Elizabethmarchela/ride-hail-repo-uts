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
    const { orderId, review } = req.body;

    const result = await service.giveRating(orderId, review);

    res.json({
      message: 'Rating submitted',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function validateVoucher(req, res) {
  try {
    const { code } = req.body;

    const result = await service.validateVoucher(code);

    res.status(200).json({
      success: true,
      message: 'Voucher is valid and ready to use',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
}

module.exports = {
  finalPayment,
  rating,
  validateVoucher
};
