const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');

// Create a room
router.post('/create-room', roomController.createRoom);
router.get('/get-room', roomController.getRoom);
router.get('/getUsers', roomController.getUsers);
router.post('/join-room', roomController.joinRoom);
router.post('/delete-room', roomController.deleteRoom);

module.exports = router;