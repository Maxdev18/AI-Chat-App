const User = require('../models/userSchema');
const Message = require('../models/messageSchema');
const Room = require('../models/roomSchema');

exports.createMessage = async (req,res) => {

}

exports.deleteMessage = async (req, res) => {
  const message = req.body;

  await Message.findByIdAndDelete({_id: ObjectId(message._id)});
  return res.status(200);
}

exports.getMessages = async (req, res) => {
  const roomId = req.params.id;
  const roomData = req.body;
  console.log(roomData);
  const messages = await Message.find({roomId: ObjectId(message.roomId)});
  console.log(messages);
  return res.status(200).json(messages);
}