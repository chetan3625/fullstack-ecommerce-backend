const jwt = require('jsonwebtoken');
const AdminModel = require('../../models/admin.model');
const Vendor = require('../../models/vendor.model');

/* ---------------- REGISTER ADMIN ---------------- */
async function registerAdmin(req, res) {
    try {
        const { adminname, password } = req.body;

        const existingAdmin = await AdminModel.findOne({ adminname });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        const newAdmin = new AdminModel({ adminname, password });
        await newAdmin.save();

        const token = jwt.sign(
            { id: newAdmin._id, role: "admin" },
            process.env.JWT_SECRET
        );


        return res.status(201).json({ message: "Admin registered successfully", token });
        

    } catch (err) {
        return res.status(500).json({ error: "Internal server error", err });
    }
}

/* ---------------- ADMIN LOGIN ---------------- */
async function adminmethods(req, res) {
    try {
        // Token + admin role are already verified by middleware.
        // verifyToken attaches req.admin for valid admin tokens.
        if (!req.admin) {
            return res.status(401).json({ error: "Admin not found" });
        }
        return res.status(200).json({ message: "Admin methods accessed successfully" });


    } catch (err) {
        return res.status(500).json({ error: "Internal server error", err });
    }
}

/* ---------------- VENDORS WITH PRODUCTS ---------------- */
async function getAllVendorsWithProducts(req, res) {
    try {
        const vendors = await Vendor.find({})
            .select('-password')
            .populate('products');

        return res.status(200).json({
            count: vendors.length,
            vendors
        });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error", err });
    }
}

/* ---------------- EXPORTS ---------------- */
module.exports = {
    registerAdmin,
    adminmethods,
    getAllVendorsWithProducts
};
