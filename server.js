require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db.config');

connectDB();

app.get('/getbackend', (req, res) => {
  res.send('Backend is live 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
