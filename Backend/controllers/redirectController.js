const QR = require("../models/QRModel");
const Scan = require("../models/ScanModel");
const UAParser = require("ua-parser-js");

exports.handleRedirect = async (req, res) => {
  const { shortId } = req.params;

  const qr = await QR.findOne({ shortId, isActive: true });
  if (!qr) return res.status(404).send("QR not found");

  // Increment scan count
  qr.scans += 1;
  await qr.save();

  // Parse device info
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();

  await Scan.create({
    qrId: qr._id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    device: result.device.type || "desktop",
    browser: result.browser.name,
    os: result.os.name,
  });

  return res.redirect(qr.originalValue);
};
