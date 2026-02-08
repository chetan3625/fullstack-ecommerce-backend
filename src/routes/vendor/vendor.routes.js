const express = require('express');
const vendorRouter = express.Router();
const vendorController = require('../../controllers/vendor/register.controller.js');
const loginController = require('../../controllers/vendor/login.controller.js');
const addProductController = require('../../controllers/vendor/add-product.controller.js');
const verifyToken = require('../../middlewares/auth/verify-token.middleware.js');
const delete_prod = require('../../controllers/vendor/delete-product.controller.js');
const updateProduct = require('../../controllers/vendor/patch-product.controller.js');
const { getOrders } = require('../../controllers/vendor/get_orders.js');
const {get_your_total_products}= require("../../controllers/vendor/get_your_total_products.js")

vendorRouter.post('/vendor/register', vendorController.registerVendor);
vendorRouter.post('/vendor/login', loginController.loginVendor);
vendorRouter.post('/vendor/addProduct', verifyToken, addProductController.addProduct);
vendorRouter.delete('/vendor/deleteProduct/:id',verifyToken, delete_prod);
vendorRouter.patch('/vendor/updateProduct/:id',verifyToken, updateProduct);
vendorRouter.get('/vendor/getorders',verifyToken,getOrders);
vendorRouter.get('/vendor/totalproducts',verifyToken,get_your_total_products);






module.exports=vendorRouter;
