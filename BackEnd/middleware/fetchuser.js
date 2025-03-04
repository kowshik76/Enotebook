const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "vottakaistar123";

const fetchuser = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: "Access Denied! No token provided." });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Token! Please login again." });
    }
};

module.exports = fetchuser;