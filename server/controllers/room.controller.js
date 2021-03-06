const User = require('../models/userSchema');
const Room = require('../models/roomSchema');
const Message = require('../models/messageSchema');
const cloudinary = require('../utils/cloudinary');

// Generate unique room id
async function generateRoomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let id = '', room;

  while(!room) {
    for(let i = 0; i < 11; i++) {
      id += chars[Math.floor(Math.random() * 36)];
    }

    room = await Room.findOne({ roomId: id })
      .then(data => {
        return data;
      });

    if(room) {
      room = '', id = '';
      continue;
    } else {
      break;
    }
  }
  
  return id;
}

// Generate default room profile picture
function generateProfilePic(pic) {
  let profilePic = {};

  // Generate random hex code for profile background color
  const hexChars = 'ABCDEF1234567890';
  let hex = '';

  for(let i = 0; i < 6; i++) {
    hex += hexChars[Math.floor(Math.random() * 16)]
  }

  profilePic.pic = pic;
  profilePic.hex = hex;
  return profilePic;
}

exports.getRoom = async (req, res) => {
  const user = req.query[0];

  const rooms = await Room.find({
    members: { $in: [user] },
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json(err);
  });

  return res.status(200).json({ rooms, message: 'Retrieved room data successfully...'});
}

exports.getUsers = async (req, res) => {
  let parsedUsers = [];

  for(user in req.query) {
    parsedUsers.push(req.query[user])
  }

  const userData = await User.find({ _id: {
    $in: parsedUsers
  }})
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    })

  return res.status(200).json({ userData, message: 'Retrieved user data successfully...' });
}

exports.createRoom = async (req, res) => {
  const room = req.body;
  const roomProfileImg = req.body.file;

  if(roomProfileImg) {
    const result = await cloudinary.uploader.upload(roomProfileImg, {
      upload_preset: 'mvb1ow5h',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    }, (err, result) => {
      if(err) {
        console.error(err)
      } else {
        return result;
      }
    });
    
    const newRoom = new Room({
      roomName: room.roomName,
      roomDesc: room.roomDesc,
      roomId: await generateRoomId(),
      admin: room.admin,
      adminName: room.adminName,
      members: [room.admin],
      settings: {
        hex: '',
        profileURL: result.secure_url,
        picPublicId: result.public_id
      }
    });
    
    const savedRoom = await newRoom.save();
    res.status(200).json({ savedRoom, message: "Created room successfully..." });
  } else {
    const profile = generateProfilePic(room.roomName[0]);
    const newRoom = new Room({
      roomName: room.roomName,
      roomDesc: room.roomDesc,
      roomId: await generateRoomId(),
      admin: room.admin,
      adminName: room.adminName,
      members: [room.admin],
      settings: {
        hex: profile.hex,
        profileURL: profile.pic,
        picPublicId: ''
      }
    });
    const savedRoom = await newRoom.save();
    res.status(200).json({ savedRoom, message: "Created room successfully..." });
  }
}

exports.joinRoom = async (req, res) => {
  const userId = req.body.id;
  const roomID = req.body.search || req.body.roomID;

  // Find room or user in db and get data
  if(roomID.length === 11) {
    const channelRoom = await Room.findOneAndUpdate({ roomId: roomID }, {
      $push: {
        members: userId
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Room or user has not been found...' });
    })

    if(channelRoom) {
      return res.status(200).json({ channelRoom, message: 'Channel found successfully...' });
    }
  } else if(roomID.length === 9) {
    const privateRoom = await User.findOne({ userAppId: roomID })
    .then(async (data) => {
      const newRoom = new Room({
        members: [data._id.toString(), userId]
      })
      const room = await newRoom.save();
      return room;
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Room or user has not been found...' });
    })

    if(privateRoom) {
      return res.status(200).json({ privateRoom, message: 'User found successfully...' });
    } else {
      return res.status(500).json({ message: 'Room or user has not been found...' });
    }
  } else {
      return res.status(400).json({ message: 'Invalid input, bad request...' });
    }
  }

exports.deleteRoom = async (req, res) => {
  const room = req.body.room;
  const currentUserId = req.body.id;

  if((room.admin !== currentUserId) && room.roomId) {
    // this is a channel but not admin
    try {
      await Room.findOneAndUpdate({_id: room._id}, { $pull: { members: currentUserId } });
      await Message.deleteMany({roomId: room._id})
      return res.status(200).json({ message: "Deleted room successfully..."});
    } catch(err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else if(!room.admin && !room.roomId) {
    // this is a private chat
    try {
      await Room.findByIdAndDelete(room._id);
      await Message.deleteMany({roomId: room._id});
      return res.status(200).json({ message: "Deleted room successfully..."});
    } catch(err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else if(room.admin) {
    // this is a channel and admin
    try {
      await Room.findOneAndDelete(room._id) 
      await Message.deleteMany({roomId: room._id})
      return res.status(200).json({ message: "Deleted room successfully..."});
    } catch(err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
}