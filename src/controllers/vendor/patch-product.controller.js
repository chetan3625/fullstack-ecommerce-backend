const express=require('express');
const Product=require('../../models/product.model');
async function updateProduct(req,res){
    try{
        
        const {id}=req.params;
        const allowedUpdates=[
            'productName',
            'productPrice',
            'productDescription',
            'productQuantity',
     ];
     const updates={};
     for(let i=0;i<allowedUpdates.length;i++){
        const key=allowedUpdates[i];
        if(req.body[key]){
            updates[key]=req.body[key];
        }
     }
         if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided to update'
      });
    }
const updatedProduct = await Product.findByIdAndUpdate(
  id,
  { $set: updates },
  { new: true, runValidators: true }
);
    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
        return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

    }catch(e){
        return res.status(500).json({
            message:'Internal server error',
            error:e.message
        });
    }
}
module.exports=updateProduct;
