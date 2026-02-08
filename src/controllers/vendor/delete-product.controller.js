const express = require('express');
const Product = require('../../models/product.model.js');

async function delete_prod(req, res) {
  try {
    const _id = req.params.id; // ✅ FIX

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
}

module.exports = delete_prod;
