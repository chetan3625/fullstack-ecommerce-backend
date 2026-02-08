const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "username, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new User({ username, email, password });

        await user.save();

        const token = jwt.sign(
            { id: user._id, role: "user" },
            process.env.JWT_SECRET
        );

        return res.status(201).json({
            message: "User registered successfully",
            token
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = password === user.password;
        if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, role: "user" },
            process.env.JWT_SECRET
        );

        const safeUser = user.toObject();
        delete safeUser.password;

        return res.status(200).json({
            message: "Login successful",
            token,
            user: safeUser
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { registerUser, loginUser };
