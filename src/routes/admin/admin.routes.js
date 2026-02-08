const express=require('express');
const isAdmin=require('../../middlewares/admin/is-admin.middleware');
const adminrouter=express.Router();
const {registerAdmin, adminmethods, getAllVendorsWithProducts}=require('../../controllers/admin/admin.controller');
const verifyToken=require('../../middlewares/auth/verify-token.middleware');

adminrouter.post('/admin/register',registerAdmin);
adminrouter.post('/admin/adminmethods',verifyToken,isAdmin,adminmethods,(req,res)=>{
});
adminrouter.get('/admin/vendors', verifyToken, isAdmin, getAllVendorsWithProducts);

module.exports=adminrouter;
