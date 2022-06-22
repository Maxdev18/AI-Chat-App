const User = require('../models/userSchema');
const Message = require('../models/messageSchema');
const cloudinary = require('../utils/cloudinary');

exports.updateProfile = async (req, res) => {
  const newProfile = req.body;
  let result, user, image;

  // Check if file exists, if so, then generate url link to that image
  if(newProfile.file) {
    result = await cloudinary.uploader.upload(newProfile.file, {
      upload_preset: 'mvb1ow5h',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    }, (err, result) => {
      if(err) console.error(err)
      return result;
    });
  }

  if(newProfile.name) {
    // Only runs when there is no image upload
    user = await User.findOneAndUpdate({ _id: newProfile.id }, { 
      name: newProfile.name,
      'settings.bio': newProfile.bio
    }).then(user => {
      return user;
    }).catch(err=> {
      res.status(500).json({ message: "Update failed..." });
      console.error(err);
    });
  }

  if(newProfile.file) {
    image = result.secure_url;
    // Updates the current user's profile
    image = await User.findOneAndUpdate({ _id: newProfile.id }, {'settings.profilePic.pic': image})
      .then(async (user) => {
        await Message.updateMany({ sender: user._id }, {'senderProfile.picUrl': image});
        return image;
      }).catch(err => {
        res.status(500).json({ message: "Update failed..." });
        console.error(err);
      })
  }

  if(result && user) {
    res.status(200).json({ image, message: "Update successful..."});
  } else if(user) {
    res.status(200).json({ message: "Update successful..."});
  } else {
    res.status(500).json({ message: 'Something went wrong...'})
  }
}