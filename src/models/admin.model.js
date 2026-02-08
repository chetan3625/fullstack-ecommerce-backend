const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    adminname:String,
    password:String,
})
const AdminModel=mongoose.model('admin',adminSchema);
module.exports=AdminModel;