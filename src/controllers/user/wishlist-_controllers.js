const User = require('../../models/user.model');
const Product = require('../../models/product.model');

async function add_to_wishList(req, res) {
  try {
    const userId = req.auth.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ correct duplicate check
    const alreadyExists = await User.exists({
      _id: userId,
      wishList: productId
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Product already in wishlist"
      });
    }

    user.wishList.push(productId);
    await user.save();

    return res.status(200).json({
      message: "Product added to wishlist",
      wishList: user.wishList
    });

  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
}

async function remove_from_wishList(req, res) {
    try{
            const userId = req.auth.id;
    const { productId } = req.body;
            const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    for(let i=0;i<user.wishList.length;i++){
        if(user.wishList[i].toString() === productId){
            user.wishList.splice(i,1);
            await user.save();
            return res.status(200).json({
                message: "Product removed from wishlist",
                wishList: user.wishList
              });
        }
    }
    }catch(e){
        return res.status(500).json({
        message: "Internal server error",
        error: e.message
        });
    }
}
async function check_wishlist(req,res){
    try{
        const userId = req.auth.id;
        const listofWishlist=await User.findById(userId).populate('wishList').select('wishList');
        return res.status(200).json({
            message:"Wishlist fetched successfully",
            listofWishlist
        });
        
    }catch(e){
        return res.status(500).json({
        message: "Internal server error",
        error: e.message
        });
    }
}

module.exports = { add_to_wishList, remove_from_wishList, check_wishlist };
