const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },

  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["URL", "TEXT", "CONTACT", "EMAIL", "PHONE", "APP"],
    default: "URL",
  },

  originalValue: {
    type: String,
    required: true,
  },

  shortId: {
    type: String,
    unique: true,
    index: true,
  },

  redirectUrl: {
    type: String,
  },

  qrImage: {
    type: String, // base64
  },

  mode: {
    type: String,
    enum: ["STATIC", "DYNAMIC"],
    default: "STATIC",
  },

  scans: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
isActive: {
  type: Boolean,
  default: true,
},


});

module.exports = mongoose.model("QR", qrSchema);
