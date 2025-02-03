const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

// Middleware
app.use(express.json()); // To parse JSON data

// Enable CORS for all routes
app.use(cors({
  origin: 'https://full-stack-task-management-app-lake.vercel.app', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials
}));


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant';

mongoose.connect(MONGO_URI,)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/menu', require('./routes/menu.routes'));
app.use('/api/order', require('./routes/order.routes'));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
