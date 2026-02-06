const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  qrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QR",
    required: true,
  },

  ip: String,
  userAgent: String,
  device: String,
  browser: String,
  os: String,
  country: String,

  scannedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Scan", scanSchema);
