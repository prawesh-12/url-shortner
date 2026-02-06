const express = require("express");
const URL = require("../models/schemaURL");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.render("home", {
            urls: allUrls,
            id: req.query.newId || null,
            error: req.query.error || null,
            success: req.query.success || null,
        });
    } catch (error) {
        console.error("Error loading home:", error);
        return res.render("home", {
            urls: [],
            error: "Failed to load URLs",
        });
    }
});

module.exports = router;
