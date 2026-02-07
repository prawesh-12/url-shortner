const { setUser } = require("../services/auth");
const User = require("../models/schemaUsers");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.render("signup", {
            error: "Email already exists or signup failed",
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });

    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
