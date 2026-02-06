const QRCode = require("qrcode");
const QR = require("../models/QRModel");
const generateShortId = require("../utils/generateShortId");

exports.createQR = async (req, res) => {
  console.log("REQ.USER 👉", req.user);

  const { title, value, type, mode } = req.body;

  if (!title || !value) {
    return res.status(400).json({ message: "Title & value required" });
  }

  const shortId = generateShortId();
  const redirectUrl = `${process.env.BASE_URL}/r/${shortId}`;

  const qrImage = await QRCode.toDataURL(
    mode === "DYNAMIC" ? redirectUrl : value
  );

  const qr = await QR.create({
    userId: req.user.id,
    title,
    type,
    originalValue: value,
    shortId,
    redirectUrl,
    qrImage,
    mode: mode || "STATIC",
  });

  res.status(201).json(qr);
};

// exports.getMyQRCodes = async (req, res) => {

//   const qrs = await QR.find({ userId: req.user.uid }).sort({ createdAt: -1 });
//   res.json(qrs);
// };

exports.getMyQrs = async (req, res) => {
  try {
    console.log("MY QRS USER 👉", req.user);

    const qrs = await QR.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: qrs.length,
      data: qrs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQRById = async (req, res) => {
  const qr = await QR.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!qr) {
    return res.status(404).json({ message: "QR not found" });
  }

  res.json(qr);
};


// DELETE QR
// SOFT DELETE QR
exports.deleteQR = async (req, res) => {
  const qr = await QR.findOne({
    _id: req.params.id,
    userId: req.user.id,
    isActive: true,
  });

  if (!qr) {
    return res.status(404).json({ message: "QR not found" });
  }

  qr.isActive = false;
  await qr.save();

  res.json({ message: "QR deleted (soft)" });
};
