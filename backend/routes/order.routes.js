const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controllers');

// Routes for Order Management
router.post('/add', orderController.placeOrder);
router.get('/orders', orderController.getUserOrders);

module.exports = router;