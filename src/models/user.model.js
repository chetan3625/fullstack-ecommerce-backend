const mongoose = require('mongoose');
const Vendor=require('./vendor.model');
const userSchema = new mongoose.Schema({
   username:{
         type:String,
         required:true

   },
   email:{
         type:String,
         required:[true,'Please enter a valid email'],
         unique:true,
         validate: {
            validator: function(v){
               return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
         }
   },
   password:{
         type:String,
         required:true,
         validate: {
            validator: function(v){
               return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(v);
            },
            message:'Password must be 6 to 20 characters long and contain at least one numeric digit, one uppercase and one lowercase letter'
         }
   },
   wishList:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: []
   }],
   cart: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
    vendorId:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    }

  },
  
],
address: {
  street: String,
  city: String,
  state: String,
  pincode: String
}


});
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;
