async function isAdmin(req, res, next) {
    try {

        // verifyToken middleware ने हे set केलेलं असतं
        if (!req.auth || req.auth.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied. Admin only."
            });
        }
        // optional extra safety
        if (!req.admin) {
            return res.status(401).json({
                message: "Admin data not found"
            });
        }

        next(); // ✅ पुढे controller कडे जा

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

module.exports = isAdmin;
