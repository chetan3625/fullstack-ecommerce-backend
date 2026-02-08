require('dotenv').config();
const app=require('./src/app');
const connectDB=require('./src/config/db.config');
const mongoose=require('mongoose');

connectDB();

app.get('/getbackend', (req, res) => {
  res.send('Backend is live 🚀');
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
