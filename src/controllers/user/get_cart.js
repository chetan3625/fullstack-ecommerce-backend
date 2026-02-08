const User = require('../../models/user.model');

async function get_cart(req, res) {
  try {
    const userId = req.auth.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId)
      .select('cart')
      .populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = (user.cart || [])
      .filter(item => item && item.productId)
      .map(item => ({
        product: item.productId,
        quantity: item.quantity || 0,
        vendorId: item.vendorId
      }));

    const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    return res.status(200).json({
      count: cartItems.length,
      totalQuantity,
      cart: cartItems
    });

  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
}

module.exports = { get_cart };
