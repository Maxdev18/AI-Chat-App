const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');

router.post('/create-room/:uid', roomController.createRoom);
router.get('/delete-room/:roomid', roomController.deleteRoom);

module.exports = router;