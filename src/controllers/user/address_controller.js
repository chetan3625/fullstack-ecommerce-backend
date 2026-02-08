const User = require('../../models/user.model');
const verifyToken=require("../../middlewares/auth/verify-token.middleware")
async function post_address(req, res) {
  try {
    const userId = req.auth.id;
    const address = req.body;

    if (!address) {
      return res.status(400).json({
        message: "Address is required"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address: address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Address saved successfully",
      address: updatedUser.address
    });

  } catch (e) {
    return res.status(500).json({
      message: e.message
    });
  }
}

module.exports = { post_address };
