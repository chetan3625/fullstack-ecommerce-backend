const Product = require('../../models/product.model');

async function search_product(req, res) {
  try {
    const searchtext = req.query.search; // 👈 string
    console.log(searchtext);

    const searched_products = await Product.find({
    $or:[
      {  productName:{
        $regex: searchtext,
        $options: "i" // case-insensitive
      },},
     { productDescription:{
         $regex: searchtext,
        $options: "i"
      }}

    ]
      
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      count: searched_products.length,
      products: searched_products
    });

  } catch (e) {
    return res.status(500).json({
      message: "Search failed",
      error: e.message
    });
  }
}

module.exports = { search_product };
