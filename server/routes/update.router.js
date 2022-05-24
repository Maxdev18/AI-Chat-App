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

const updateControllers = require('../controllers/update.controller');

router.post('/update-profile', upload.single('file'), updateControllers.updateProfile);

module.exports = router;