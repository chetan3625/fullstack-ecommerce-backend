const express=require("express");
const Product=require("../../models/product.model")
const Vendor=require("../../models/vendor.model")
const verifyToke=require("../../middlewares/auth/verify-token.middleware");
const userModel = require("../../models/user.model");
const { all } = require("../../routes/vendor/vendor.routes");
async function get_your_total_products(req,res){
    const vendorId=req.auth.id
    try{
        const allproducts=[];
        const totalProductsId=await Vendor.findById({_id:vendorId}).select('products')
        console.log(totalProductsId);
        for(let i=0;i<totalProductsId.products.length;i++){
            const product=await Product.findById(totalProductsId.products[i])
            await allproducts.push(product)
        }
        console.log(allproducts);
        res.json({message:"all Products Fetched sucessfully",allproducts})

    }catch(e){
        console.log(e.message);
    }


}
module.exports={get_your_total_products}