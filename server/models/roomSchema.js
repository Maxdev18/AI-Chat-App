const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomName: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    required: true,
    default: [{
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: true
    }]
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: {
    type: Array,
    default: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
