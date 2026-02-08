const express = require('express');
const Vendor = require('../../models/vendor.model');
const jwt=require('jsonwebtoken');

async function registerVendor(req,res){
    const {vendorname,password}=req.body;
    const existingVendor=await Vendor.findOne({vendorname});
    if(existingVendor){
        return res.status(400).json({message:"Vendor already exists",vendorId:existingVendor._id});
    }
    const vendor=new Vendor({vendorname,password});
    
    await vendor.save();
    const token=jwt.sign({id: vendor._id, role:"vendor"},process.env.JWT_SECRET);

    res.status(201).json({message:"Vendor registered successfully",
    vendorId:vendor._id,
    token:token
    });

    

}
module.exports={registerVendor};
