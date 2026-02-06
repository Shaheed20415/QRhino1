const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwtMiddleware");
const { createQR, getMyQrs, getQRById, deleteQR } = require("../controllers/qrController");

router.post("/", protect, createQR);
router.get("/my", protect, getMyQrs);
router.get("/:id", protect, getQRById);
router.delete("/:id", protect, deleteQR);
module.exports = router;
