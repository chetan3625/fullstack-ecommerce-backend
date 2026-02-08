const express=require('express');
const Vendor=require('../../models/vendor.model');
const jwt=require('jsonwebtoken');
async function loginVendor(req,res){
    const {vendorname,password}=req.body;
    if(!vendorname || !password){
        return res.status(400).json({message:"Vendorname and password are required"});
    }
    const vendor=await Vendor.findOne({vendorname,password});
    if(!vendor){
        return res.status(401).json({message:"Invalid vendorname or password"});
    }
    const toke=jwt.sign({id: vendor._id, role:"vendor"},process.env.JWT_SECRET);
    res.status(200).json({message:"Login successful",vendorId:vendor._id,token:toke});

}
module.exports={loginVendor};
