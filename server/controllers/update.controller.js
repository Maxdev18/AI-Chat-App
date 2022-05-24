const User = require('../models/userSchema');
const path = require('path');

exports.updateProfile = async (req, res) => {
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
        'settings.profilePic.pic': 'http://localhost:5000/images/' + req.file.originalname,
        'settings.profilePic.picName': req.file.originalname
      }).then(() => {
        res.status(200).json({ imgUrl: 'http://localhost:5000/images/' + req.file.originalname, message: "Update successful..."});
      }).catch(err=> {
        res.status(500).json({message: "Update failed..."});
        console.error(err);
      }) 
    } else {
      await User.findOneAndUpdate({ _id: newProfile.id }, {
        'settings.profilePic.pic': 'https://chattingai-backend.herokuapp.com/images/' + req.file.originalname,
        'settings.profilePic.picName': req.file.originalname
      }).then(() => {
        res.status(200).json({ imgUrl: 'https://chattingai-backend.herokuapp.com/images/' + req.file.originalname, message: "Update successful..."});
      }).catch(err=> {
        res.status(500).json({message: "Update failed..."});
        console.error(err);
      }) 
    }
  }
}

exports.getProfile = async (req, res) => {
  const imgUrl = req.params.imgUrl;

  const options = {
    root: path.join(__dirname, '..', '..')
  }

  await User.findOne({ 'settings.profilePic.picName': imgUrl })
    .then(user => {
      res.status(200).sendFile(`/images/${user.settings.profilePic.picName}`, options);
    })
    .catch(err=> {
      if(err) {
        console.error(err);
        res.status(500).json({message: "fetch image failed..."})
      }
    })
}