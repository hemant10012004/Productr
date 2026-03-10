const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors({
  origin: '*', // Allows requests from any frontend URL (good for deployment testing)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const { MongoMemoryServer } = require('mongodb-memory-server');

// Connect Database
const connectDB = async () => {
  try {
    console.log('Attempting to connect to local MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/productr', {
      serverSelectionTimeoutMS: 2000 // Very short timeout
    });
    console.log('✅ Local MongoDB Connected');
  } catch (err) {
    console.log('⚠️ Local MongoDB not found. Spinning up In-Memory MongoDB...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      await mongoose.connect(uri);
      console.log('✅ In-Memory MongoDB Connected');
    } catch (memErr) {
      console.error('Failed to start any database:', memErr.message);
    }
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('Productr API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
