const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
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
