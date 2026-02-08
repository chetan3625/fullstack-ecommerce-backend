const mongoose=require('mongoose');




async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL + '&retryWrites=true&w=majority&tls=true');
        console.log('Connected to database');

    }catch(e){
        console.log('Error connecting to database',e);
    }
}
module.exports=connectDB;