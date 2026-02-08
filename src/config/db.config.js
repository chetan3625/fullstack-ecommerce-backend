const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://chetan3625:chetan3625@cluster0.mjwuvmy.mongodb.net/mydb?retryWrites=true&w=majority",
      {
        tls: true,
        tlsAllowInvalidCertificates: true,
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log('Connected to database');
  } catch (e) {
    console.log('Error connecting to database', e);
  }
}

module.exports = connectDB;
