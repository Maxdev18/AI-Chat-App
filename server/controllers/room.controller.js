const User = require('../models/userSchema');
const Message = require('../models/messageSchema');
const Room = require('../models/roomSchema');

// Generate unique room id
async function generateUserAppId() {
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

exports.createRoom = async (req, res) => {

}

exports.deleteRoom = async (req, res) => {

}