const express = require('express');
const router = express.Router();

const updateControllers = require('../controllers/update.controller');

router.post('/update-profile', updateControllers.updateProfile);

module.exports = router;