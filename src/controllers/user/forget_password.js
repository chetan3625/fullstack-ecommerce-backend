const express = require('express');
const User = require('../../models/user.model');

async function forget_password(req, res) {
    try {
        const userId = req.auth.id;
        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ message: "newPassword is required" });
        }

        const reset_users_password = await User.findOneAndUpdate(
            { _id: userId },
            { password: newPassword },
            { new: true }
        );

        if (!reset_users_password) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Password reset successfully", userId });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { forget_password };
