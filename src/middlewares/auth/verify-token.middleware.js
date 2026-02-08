const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const Admin = require('../../models/admin.model');
const Vendor = require('../../models/vendor.model');

async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.auth = decoded;

        if (decoded.role === "admin") {
            const admin = await Admin.findById(decoded.id).select('-password');
            if (!admin) {
                return res.status(401).json({ message: "Admin not found" });
            }
            req.admin = admin;   // 🔥 admin attach
        } else if (decoded.role === "user") {
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;     // 🔥 user attach
        }
        else if (decoded.role === "vendor") {
            const vendor = await Vendor.findById(decoded.id).select('-password');
            if (!vendor) {
                return res.status(401).json({ message: "Vendor not found" });
            }
            req.vendor = vendor; 
        }

        next(); // ✅ very important

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
}

module.exports = verifyToken;
