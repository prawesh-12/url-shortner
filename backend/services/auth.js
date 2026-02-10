const jwt = require("jsonwebtoken");
const secretKey = "23$2laifyudkjcbniertuygiubcvikg*717";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        secretKey,
    );
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
