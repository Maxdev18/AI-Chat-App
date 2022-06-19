const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Room = require('../models/roomSchema');

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

let newFileName;
const generateNewId = () => {
  const newId = uuidv4();
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

const roomController = require('../controllers/room.controller');

// Create a room
router.post('/create-room', upload.single('file'), async (req, res) => {
  const room = req.body;
  const roomProfileImg = req.file;
  let imgUrl;

  if(req.rawHeaders[1] === 'localhost:5000' && roomProfileImg) {
    imgUrl = 'http://localhost:5000/images/' + newFileName;
  } else if(req.rawHeaders[1] === 'chattingai-backend.herokuapp.com' && roomProfileImg){
    imgUrl = 'https://chattingai-backend.herokuapp.com/images/' + newFileName;
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
        profilePic: imgUrl,
        picName: newFileName
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
        profilePic: profile.pic,
        picName: ''
      }
    });
    const savedRoom = await newRoom.save();
    res.status(200).json({savedRoom, message: "Created room successfully..." });
  }
});

router.get('/get-room', roomController.getRoom);
router.get('/getUsers', roomController.getUsers);
router.post('/join-room', roomController.joinRoom);
router.get('/delete-room', roomController.deleteRoom);

module.exports = router;