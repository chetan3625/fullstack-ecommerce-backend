const mongoose= require('mongoose');
const prodductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        enum:['electronics','clothing','food','furniture'],
        default:'electronics'
    },
    productQuantity:{
        type:Number,
        required:true,
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor',
        required:true
    }

});
mongoose.model('Product',prodductSchema);
module.exports=mongoose.model('Product');