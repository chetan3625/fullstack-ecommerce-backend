const Users = require('../../models/user.model');

async function getOrders(req, res) {
  try {
    const vendorId = req.auth.vendorId || req.auth.id;
    if (!vendorId) {
      return res.status(401).json({ message: "Vendor not authenticated" });
    }

    const orderedUsers = await Users.find({
      "cart.vendorId": vendorId
    })
      .select("username cart")
      .populate("cart.productId", "productName productPrice vendorId");

    const vendorOrders = orderedUsers.map(user => {
      const vendorCart = user.cart
        .filter(c => c.vendorId && c.vendorId.toString() === vendorId.toString())
        .map(c => ({
          product: c.productId,
          quantity: c.quantity
        }));

      if (vendorCart.length > 0) {
        return {
          username: user.username,
          products: vendorCart
        };
      }
      return null;
    }).filter(Boolean);

    return res.status(200).json({
      message: "Vendor orders fetched successfully",
      orders: vendorOrders
    });

  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e.message });
  }
}

module.exports = { getOrders };
