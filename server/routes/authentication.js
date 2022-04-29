const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authentication');

// Authentication routes
router.post('/register', authControllers.register);

router.post('/login', authControllers.login);

router.post('/resetpassword', authControllers.resetPassword);

router.get('/checkauth', authControllers.checkAuth);

router.get('/logout', authControllers.logout);

module.exports = router;