const User = require('../models/userSchema');

exports.updateProfile = async (req, res) => {
  const newProfile = req.body;
  console.log(newProfile.file)
  if(!newProfile.file) {
    await User.findOneAndUpdate({ _id: newProfile.id }, { 
      name: newProfile.name,
      'settings.bio': newProfile.bio
    }).then(() => {
      res.status(200).json({ message: "Update successful..."});
    }).catch(err=> {
      res.status(500).json({message: "Update failed..."});
      console.error(err);
    });
  } else {
    await User.findOneAndUpdate({ _id: newProfile.id }, {
      'settings.profilePic.pic': newProfile.file
    }).then(() => {
      res.status(200).json({ message: "Update successful..."});
      res.json({ file: newProfile.file});
    }).catch(err=> {
      res.status(500).json({message: "Update failed..."});
      console.error(err);
    }) 
  }
}