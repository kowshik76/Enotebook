const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "vottakaistar123"; // Ensure env variable

const fetchuser = (req, res, next) => {
    // ✅ Get the token from headers
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: "Access Denied! No token provided." });
    }

    try {
        // ✅ Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Token! Please login again." });
    }
};

module.exports = fetchuser;
