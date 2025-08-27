// middleware/auth.js

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded; // The JWT payload is now available in req.user
        next();
    } catch (e) {
        res.status(401).json({ message: "Token is not valid" });
    }
};