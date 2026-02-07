const express = require("express");

const {
    handleGenerateNewShortURL,
    handleGetURLById,
    handleGetAnalytics,
    handleDeleteURL,
} = require("../controllers/urlHandlers");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetURLById);
router.get("/analytics/:shortId", handleGetAnalytics);
router.post("/delete/:shortId", handleDeleteURL);

module.exports = router;
