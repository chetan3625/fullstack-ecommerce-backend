const express=require('express');
const app=express();
app.use(express.json());
const adminRoutes=require('./routes/admin/admin.routes');
const vendorRouter=require('./routes/vendor/vendor.routes');
const userRouter=require('./routes/user/user.routes');


app.use("/api",adminRoutes);
app.use("/api",vendorRouter);
app.use("/api",userRouter);

module.exports=app;
