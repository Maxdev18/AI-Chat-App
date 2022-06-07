const Message = require('../models/messageSchema');

exports.getMessages = async (req, res) => {
  const roomId = req.query[0];
  
  const messages = await Message.find({ roomId })
    .catch(err => {
      return res.status(500).json(err);
    })

  // Message pagination with a size limit of 25
  const lastMsg = messages.slice(-1);
  const lastCreatedAt = lastMsg[0]?.createdAt;
  let paginatedMessages;
  if(messages) {
    paginatedMessages = await Message.find({ $and: [{ roomId },{ createdAt: { $lt: lastCreatedAt }}]}).limit(25)
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    })
    return res.status(200).json({ messages: [...paginatedMessages, lastMsg[0]] });
  } else if(messages.length === 0) {
    return res.status(200).json(null);
  }
  
  return res.status(200).json({ messages: [lastMsg[0]] });
}

exports.createMessage = async (req, res) => {
  const { text, sender, senderName, senderProfile } = req.body;
  const roomId = req.params.id;
  
  // Save to db
  try {
    const message = new Message({
      roomId,
      sender,
      senderName,
      senderProfile,
      text,
      createdAt: Date.now()
    });
  
    await message.save();
    res.status(200).json({ message });
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
}

exports.deleteMessage = async (req, res) => {
  const message = req.body;
  const id = req.params.id;

  await Message.findByIdAndDelete({_id: ObjectId(message._id)});
  return res.status(200);
}