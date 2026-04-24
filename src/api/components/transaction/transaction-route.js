const express = require('express');

const route = express.Router();
const controller = require('./transaction-controller');

router.post('/final-payment', controller.finalPayment);
router.post('/rating', controller.rating);

module.exports = router;