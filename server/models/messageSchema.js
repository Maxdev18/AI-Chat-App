const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;