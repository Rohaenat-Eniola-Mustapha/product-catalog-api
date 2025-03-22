const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const productRoutes = require('./routes/products.js');
const categoryRoutes = require('./routes/categories');
const reportRoutes = require('./routes/reports');
const variantRoutes = require('./routes/variants');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/reports', reportRoutes);
app.use('/products/:productId/variants', variantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
