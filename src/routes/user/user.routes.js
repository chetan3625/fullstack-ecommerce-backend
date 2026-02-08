const express = require('express');
const userController = require('../../controllers/user/user.controller');
const verifyToken = require('../../middlewares/auth/verify-token.middleware');
const { getProductsByCategory } = require('../../controllers/user/get-product-by-category.controller');
const { updateUserDetails } = require('../../controllers/user/update-user-details.controller');
const { add_to_wishList,remove_from_wishList , check_wishlist} = require('../../controllers/user/wishlist-_controllers');
const { addToCart, remove_from_cart } = require('../../controllers/user/cart_controller');
const {search_product}=require("../../controllers/user/searchproducts");
const {forget_password}=require("../../controllers/user/forget_password");
const {post_address}=require("../../controllers/user/address_controller");
const {get_total_price}=require("../../controllers/user/get_total_price");
const { get_cart } = require("../../controllers/user/get_cart");

const userRouter = express.Router();


userRouter.post('/auth/registeruser', userController.registerUser);
userRouter.post('/auth/loginuser', userController.loginUser);
userRouter.get('/productbycategory',verifyToken,getProductsByCategory);
userRouter.patch('/updateUser/:id',verifyToken,updateUserDetails);
userRouter.post('/add-to-wishlist',verifyToken,add_to_wishList);
userRouter.post('/remove-from-wishlist',verifyToken,remove_from_wishList);
userRouter.get('/get-wishlist',verifyToken,check_wishlist);
userRouter.post('/addtocart',verifyToken,addToCart);
userRouter.patch('/remove-from-cart/:productId',verifyToken,remove_from_cart);
userRouter.get('/search-products', verifyToken, search_product);
userRouter.patch('/forget-password',verifyToken,forget_password);
userRouter.patch("/post-address",verifyToken,post_address);
userRouter.get("/total-price-to-pay",verifyToken,get_total_price);
userRouter.get("/get_cart",verifyToken,get_cart)





module.exports = userRouter;
