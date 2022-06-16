const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomName: {
    type: String,
  },
  roomDesc: {
    type: String
  },
  roomId: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  adminName: {
    type: String,
  },
  members: {
    type: Array,
    default: [{
      type: String,
    }]
  },
  settings: {
    type: Object
  }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
