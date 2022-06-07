const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

router.post('/create-message/:id', messageController.createMessage);
router.get('/delete-message/:id', messageController.deleteMessage);
router.get('/get-messages', messageController.getMessages);

module.exports = router;