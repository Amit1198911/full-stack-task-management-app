const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controllers');

// Routes for Menu Management
router.get('/all', menuController.getMenu);
router.post('/add', menuController.addMenuItem);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;