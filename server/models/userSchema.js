const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare and initialze user schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  googleSignIn: {
    type: Boolean,
    required: true,
    default: false
  },
  userAppId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: 'false'
  },
  settings: {
    type: Object,
    required: true,
    default: {
      profilePic: {
        type: Object,
        required: true,
        default: {
          pic: {
            type: String,
            required: true
          },
          hex: {
            type: String,
            default: ''
          }
        }
      },
      bio: {
        type: String,
        default: ''
      },
    }
  }
}, { timestamps: true });

// Declare and initialize user model
const User = mongoose.model('User', UserSchema);

module.exports = User;