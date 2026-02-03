const express = require("express");
const {
    handleGenerateNewShortURL,
    handleGetURLById,
} = require("../backend/controllers/urlHandlers");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetURLById);

module.exports = router;
