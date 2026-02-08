const Product=require('../../models/product.model');
const Vendor=require('../../models/vendor.model');
const verifyToken=require('../../middlewares/auth/verify-token.middleware');

async function addProduct(req,res){
    try{
        const vendorId=req.auth.vendorId
        const {productName,productDescription,productPrice,productQuantity}=req.body;
        const existingProduct=await Product.findOne({productName,vendorId});
        if(existingProduct){
            return res.status(400).json({message:"Product already exists"});
        }
        const product=new Product({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            vendorId
        });
        await Vendor.findByIdAndUpdate(vendorId,{$push:{products:product._id}});
        await product.save();
        res.status(201).json({message:"Product added successfully",product});
    }catch(e){
        res.status(500).json({message:"Error adding product",error:e.message});
    }
}
module.exports={addProduct};
