const User = require('../models/userSchema');
const Room = require('../models/roomSchema');
const Message = require('../models/messageSchema');

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