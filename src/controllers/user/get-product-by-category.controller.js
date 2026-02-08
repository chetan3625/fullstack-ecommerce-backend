const express=require('express');
const Product = require('../../models/product.model');

async function getProductsByCategory(req, res) {
      try {
    const category = (req.query.category || '').toString().trim().toLowerCase();
    if (!category) {
      return res.status(400).json({ error: "category is required" });
    }

    const products = await Product.find({ productCategory: category });


    return res.status(200).json({
      count: products.length,
      products
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
module.exports = {getProductsByCategory};
