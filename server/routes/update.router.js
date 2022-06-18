const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userSchema');
const Message = require('../models/messageSchema');

let newId;
let newFileName;
const generateNewId = () => {
  newId = uuidv4();
  return newId;
}

// save uploaded images to the server
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split('.');
    newFileName = fileName[0] + "-" + generateNewId() + "." + fileName[1]
    cb(null, newFileName);
  }
});

const upload = multer({storage: fileStorageEngine});

router.post('/update-profile', upload.single('file'), async (req, res) => {
  const newProfile = req.body;

  if(newProfile.name) {
    await User.findOneAndUpdate({ _id: newProfile.id }, { 
      name: newProfile.name,
      'settings.bio': newProfile.bio
    }).then(() => {
      res.status(200).json({ message: "Update successful..."});
    }).catch(err=> {
      res.status(500).json({message: "Update failed..."});
      console.error(err);
    });
  } else if(req.file) {
    // save uploaded images to the database
    if(req.rawHeaders[1] === 'localhost:5000') {
      await User.findOneAndUpdate({ _id: newProfile.id }, {
        'settings.profilePic.pic': 'http://localhost:5000/images/' + newFileName,
        'settings.profilePic.picName': newFileName
      }).then(async (user) => {
        await Message.updateMany({sender: user._id}, {'senderProfile.picUrl': 'http://localhost:5000/images/' + newFileName});
        res.status(200).json({ imgUrl: 'http://localhost:5000/images/' + newFileName, message: "Update successful..."});
      }).catch(err=> {
        res.status(500).json({message: "Update failed..."});
        console.error(err);
      }) 
    } else {
      await User.findOneAndUpdate({ _id: newProfile.id }, {
        'settings.profilePic.pic': 'https://chattingai-backend.herokuapp.com/images/' + newFileName,
        'settings.profilePic.picName': newFileName
      }).then(async (user) => {
        await Message.updateMany({sender: user._id}, {'senderProfile.picUrl': 'https://chattingai-backend.herokuapp.com/images/' + newFileName});
        res.status(200).json({ imgUrl: 'https://chattingai-backend.herokuapp.com/images/' + newFileName, message: "Update successful..."});
      }).catch(err=> {
        res.status(500).json({message: "Update failed..."});
        console.error(err);
      }) 
    }
  }
});

module.exports = router;