const express = require('express');
const router = express.Router();

const updateController = require('../controllers/update.controller');

router.post('/update-profile', updateController.updateProfile);

module.exports = router;