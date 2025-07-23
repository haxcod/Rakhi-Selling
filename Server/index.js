// server.js
require('dotenv').config()
const express = require('express');
const path = require('path');
const connectDB = require('./DB');
const cors = require('cors')
const app = express();
const PORT = 3000;
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes

userRoutes(app)
productRoutes(app)
orderRoutes(app)
// Test Route

app.use(express.static(path.join(__dirname, '../Rakhi-Selling/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Rakhi-Selling/dist/index.html'));
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err.message || err);
    process.exit(1); // Exit with failure
  }
};

startServer();
