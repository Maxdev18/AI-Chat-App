const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// save uploaded images to the server
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.originalname !== `${path.join(__dirname, '..', '..', '/images') + '/' + file.originalname}`) {
      cb(null, './images');
    } else {
      return null
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({storage: fileStorageEngine});

const roomController = require('../controllers/room.controller');

router.post('/create-room', upload.single('file'), roomController.createRoom);
router.put('/update-room', roomController.updateRoom);
router.get('/get-room', roomController.getRoom);
router.get('/delete-room/:roomid', roomController.deleteRoom);

module.exports = router;