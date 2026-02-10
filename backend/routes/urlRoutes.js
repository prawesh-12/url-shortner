const express = require("express");

const {
    handleGenerateNewShortURL,
    handleGetURLById,
    handleGetAnalytics,
    handleDeleteURL,
    handleGetAllURLs,
    handleGetAllURLsAdmin,
} = require("../controllers/urlHandlers");

const { restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/all", handleGetAllURLs);
router.get("/admin/all", restrictTo(["ADMIN"]), handleGetAllURLsAdmin);
router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetURLById);
router.get("/analytics/:shortId", handleGetAnalytics);
router.post("/delete/:shortId", handleDeleteURL);

module.exports = router;
