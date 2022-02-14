const mongoose = require('mongoose');
const { Schema } = mongoose;


const AdminSchema = new Schema({
  isAdmin: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;