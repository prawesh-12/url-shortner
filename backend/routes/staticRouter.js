const express = require("express");
const URL = require("../models/schemaURL");

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    try {
        const allUrls = await URL.find({ createdBy: req.user._id });
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

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get("/logout", (req, res) => {
    res.clearCookie("uid");
    return res.redirect("/login");
});

module.exports = router;
