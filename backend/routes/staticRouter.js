const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("home");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get("/admin/urls", (req, res) => {
    return res.render("admin");
});

module.exports = router;
