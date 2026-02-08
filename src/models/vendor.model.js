const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    vendorname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,

    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }]


});
mongoose.model('Vendor',vendorSchema);
module.exports=mongoose.model('Vendor');