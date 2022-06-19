const User = require('../models/userSchema');
const Room = require('../models/roomSchema');
const path = require('path');

exports.getProfile = async (req, res) => {
  const imgUrl = req.params.imgUrl;

  const options = {
    root: path.join(__dirname, '..', '..')
  }

  const user = await User.findOne({ 'settings.profilePic.picName': imgUrl })
    .then(user => {
      return user;
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "fetch image failed..."})
      return null;
    })

  if(user !== null) {
    return res.status(200).sendFile(`/images/${user.settings.profilePic.picName}`, options);
  } else {
    const channel = await Room.findOne({ 'settings.picName': imgUrl })
    .then(channel => {
      return channel;
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "fetch image failed..."});
      return null;
    })

    if(channel !== null) {
      return res.status(200).sendFile(`/images/${channel.settings.picName}`, options);
    } else {
      res.status(500).json({message: "fetch image failed..."});
    }
  }
}