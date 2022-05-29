const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomName: {
    type: String,
    required: true
  },
  roomDesc: {
    type: String
  },
  roomId: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    required: true,
    defualt: 'channel'
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
    ref: 'User',
    required: true
  },
  adminName: {
    type: String,
    required: true
  },
  members: {
    type: Array,
    default: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  settings: {
    type: Object,
    default: {
      hex: {
        type: String
      },
      profilePic: {
        type: String,
      }
    }
  }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
