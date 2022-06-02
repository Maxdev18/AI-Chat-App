const User = require('../models/userSchema');
const Message = require('../models/messageSchema');
const Room = require('../models/roomSchema');
const path = require('path');

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
      roomType: 'channel',
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
      roomType: 'channel',
      admin: room.admin,
      adminName: room.adminName,
      members: [room.admin],
      settings: {
        hex: profile.hex,
        profilePic: profile.pic
      }
    });
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom, { message: "Created room successfully..." });
  }
  
}

exports.updateRoom = async (req, res) => {

}

exports.getRoom = async (req, res) => {
  const roomID = req.query;
  let roomIDs = []
  let rooms = [];

  for(let i = 0; i < Object.keys(roomID).length; i++) {
    const id = JSON.parse(roomID[i]);
    roomIDs.push({ id })
  }

  for(room in roomIDs) {
    await Room.findById(roomIDs[room].id)
      .then(data => {
        rooms.push(data);
      })
      .catch(err => {
        if(err) console.error(err);
        return res.status(500).json({ message: "Unable to fetch room data..." });
      })
  }
  
  if(rooms.length === roomIDs.length) {
    return res.status(200).json({ rooms, message: 'Retrieved room data successfully...'});
  } else {
    return res.status(500).json({ message: "Unable to fetch room data..." })
  }
}

exports.joinRoom = async (req, res) => {
  const userId = req.body.id;
  const roomId = req.body.search

  // Find room or user in db and get data
  const channelRoom = await Room.findOneAndUpdate({ roomId: roomId }, {
      $push: {
        members: { _id: userId }
      }
    })
    .then(data => {
      return data;
    })

  // If want to start a private conversation with a person then the room doesn't exist in the first place
  // so we have to create a new room if we dont find it
  const privateRoom = await User.findOne({ userAppId: roomId })
    .then(async (data) => {
      const newRoom = new Room({
        members: [{ id: data._id }, { id: userId }]
      })
      const room = await newRoom.save();
      return room;
    })

    if(privateRoom) {
      return res.status(200).json({ privateRoom, message: 'User found successfully...' });
    } else if(channelRoom) {
      return res.status(200).json({ channelRoom, message: 'Channel found successfully...' });
    } else {
      return res.status(500).json({ message: 'Room or user has not been found...' });
    }
}

exports.deleteRoom = async (req, res) => {

}