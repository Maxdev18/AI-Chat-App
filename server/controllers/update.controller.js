const User = require('../models/userSchema');
const path = require('path');

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