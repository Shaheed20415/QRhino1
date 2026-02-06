const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};



// const admin = require("firebase-admin");
// const serviceAccount = require("../config/firebaseAdmin.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// exports.protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     req.user = decoded; // uid, email, name
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
