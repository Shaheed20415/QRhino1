const express = require("express");
const router = express.Router();
const { handleRedirect } = require("../controllers/redirectController");

router.get("/:shortId", handleRedirect);

module.exports = router;
