const express=require("express");
const User=require("../../models/user.model")
const Product=require("../../models/product.model")
const verifyToken=require("../../middlewares/auth/verify-token.middleware");
async function get_total_price(req, res) {
  try {
    const userId = req.auth.id;

    const user = await User.findById(userId).select('cart');

    if (!user || user.cart.length === 0) {
      return res.status(200).json({
        totalPrice: 0,
        message: "Cart is empty"
      });
    }

    let totalPrice = 0;

    for (let i = 0; i < user.cart.length; i++) {
      const cartItem = user.cart[i];

      const product = await Product.findById(cartItem.productId)
        .select('productPrice');

      if (!product) continue;

      totalPrice += product.productPrice * cartItem.quantity;
    }

    return res.status(200).json({
      totalPrice
    });

  } catch (e) {
    return res.status(500).json({
      message: e.message
    });
  }
}

module.exports={get_total_price}