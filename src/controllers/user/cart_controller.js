const User=require('../../models/user.model');
const Product=require('../../models/product.model');
const mongoose=require('mongoose');

function normalizeObjectId(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value.trim();
  if (value instanceof mongoose.Types.ObjectId) return value.toString();

  if (typeof value === "object") {
    if (value._id !== undefined) return normalizeObjectId(value._id);
    if (value.id !== undefined) return normalizeObjectId(value.id);
    if (value.$oid !== undefined) return normalizeObjectId(value.$oid);
  }

  return null;
}





async function addToCart(req, res) {
  try {
    const userId = req.auth.id;
    const body=req.body||{};
    const productId=normalizeObjectId(body.productId) || normalizeObjectId(body.id);
    const quantity=body.quantity;
    const productDoc = await Product.findById(productId).select('productQuantity');

if (!productDoc) {
  return res.status(404).json({ message: "Product not found" });
}

const availableQty = productDoc.productQuantity;

    if (!productId) return res.status(400).json({ message: "productId is required" });
    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).json({ message: "Invalid productId" });

    const parsedQty = Number(quantity);
    if (!Number.isSafeInteger(parsedQty) || parsedQty <= 0 )
      return res.status(400).json({ message: "quantity must be a positive integer" });
    if (parsedQty > availableQty) {
  return res.status(400).json({
    message: `Out of Stock! Only ${availableQty} available for this product`,
    availableQty
  });
}

    const product = await Product.findById(productId).select('vendorId');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // clean up any invalid/zero-quantity items from older buggy requests
    user.cart = (user.cart || []).filter(item => item && item.productId && Number(item.quantity || 0) > 0);
    let found = false;

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].productId && user.cart[i].productId.toString() === productId.toString()) {
        user.cart[i].quantity = (user.cart[i].quantity || 0) + parsedQty;
        user.cart[i].vendorId = product.vendorId;
        found = true;
        break;
      }
    }

    if (!found) {
      user.cart.push({ productId, vendorId: product.vendorId, quantity: parsedQty });
    }
const updatedProduct = await Product.findOneAndUpdate(
  {
    _id: productId,
    productQuantity: { $gte: parsedQty } 
  },
  {
    $inc: { productQuantity: -parsedQty } 
  },
  {
    new: true
  }
);




    await user.save();


    return res.status(200).json({
      message: "Product added to cart",
      cart: user.cart
    });


  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
}


async function remove_from_cart(req, res) {
  try {
    const userId = req.auth.id;
    const body = req.body || {};
    const remove_Id = normalizeObjectId(req.params.productId) || normalizeObjectId(body.productId) || normalizeObjectId(body.id);
    if (!remove_Id) return res.status(400).json({ message: "productId is required" });

    if (!mongoose.Types.ObjectId.isValid(remove_Id))
      return res.status(400).json({ message: "Invalid productId" });

    const removeQtyRaw = body.quantity;
    const removeQty = removeQtyRaw === undefined ? 1 : Number(removeQtyRaw);
    if (!Number.isSafeInteger(removeQty) || removeQty <= 0)
      return res.status(400).json({ message: "quantity must be a positive integer" });

    const user = await User.findById(userId).select("cart");
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingCartCount = (user.cart || []).length;
    user.cart = (user.cart || []).filter(item => item && item.productId && Number(item.quantity || 0) > 0);

    if (!user.cart || user.cart.length === 0) {
      if (existingCartCount !== 0) {
        user.markModified("cart");
        await user.save();
      }
      return res.status(200).json({ itemCount: 0, totalQuantity: 0, cart: [] });
    }

    const index = user.cart.findIndex(item => item.productId && item.productId.toString() === remove_Id.toString());
    if (index === -1) return res.status(404).json({ message: "Product not found in cart" });

    if ((user.cart[index].quantity || 0) > removeQty) {
      user.cart[index].quantity -= removeQty;
    } else {
      user.cart.splice(index, 1); // remove completely
    }

    if (existingCartCount !== user.cart.length) user.markModified("cart");
    await user.save();

    const totalQuantity = user.cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    return res.status(200).json({
      message: "Cart updated",
      itemCount: user.cart.length,
      totalQuantity,
      cart: user.cart
    });

  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e.message });
  }
}

module.exports={addToCart,remove_from_cart}
