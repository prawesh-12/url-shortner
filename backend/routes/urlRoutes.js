const express = require("express");
const {
    handleGenerateNewShortURL,
    handleGetURLById,
    handleGetAnalytics,
} = require("../controllers/urlHandlers");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetURLById);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
