const User = require('../models/userSchema');
const Room = require('../models/roomSchema');
const Message = require('../models/messageSchema');

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

exports.createRoom = async (req, res) => {
  const room = req.body;
  const roomProfileImg = req.file;
  let imgUrl;
  if(req.rawHeaders[1] === 'localhost:5000' && roomProfileImg) {
    imgUrl = 'http://localhost:5000/images/' + roomProfileImg.originalname;
  } else if(req.rawHeaders[1] === 'chattingai-backend.herokuapp.com' && roomProfileImg){
    imgUrl = 'https://chattingai-backend.herokuapp.com/images/' + roomProfileImg.originalname;
  }

  if(roomProfileImg) {
    const newRoom = new Room({
      roomName: room.roomName,
      roomDesc: room.roomDesc,
      roomId: await generateRoomId(),
      admin: room.admin,
      adminName: room.adminName,
      members: [room.admin],
      settings: {
        hex: '',
        profilePic: imgUrl
      }
    });
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom, { message: "Created room successfully..." });
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
        profilePic: profile.pic
      }
    });
    const savedRoom = await newRoom.save();
    res.status(200).json({savedRoom, message: "Created room successfully..." });
  }
  
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

exports.joinRoom = async (req, res) => {
  const userId = req.body.id;
  const roomId = req.body.search

  // Find room or user in db and get data
  if(roomId.length === 11) {
    const channelRoom = await Room.findOneAndUpdate({ roomId: roomId }, {
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
  } else if(roomId.length === 9) {
    const privateRoom = await User.findOne({ userAppId: roomId })
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
  const room = JSON.parse(req.query.room);
  const removeContact = req.query.removeContact;
  const currentUserId = req.query.id;
  console.log(room);
  if(removeContact && room.roomId) {
    // this is a channel but not admin
    try {
      await Room.findOneAndUpdate({_id: room._id}, { $pull: { members: currentUserId } });
      await Message.deleteMany({roomId: room._id})
      return res.status(200).json({ message: "Deleted room successfully..."});
    } catch(err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else if(removeContact && !room.roomId) {
    // this is not a channel
    // This one works but not the others
    try {
      await Room.findByIdAndDelete(room._id);
      await Message.deleteMany({roomId: room._id});
      return res.status(200).json({ message: "Deleted room successfully..."});
    } catch(err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else if(!removeContact) {
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