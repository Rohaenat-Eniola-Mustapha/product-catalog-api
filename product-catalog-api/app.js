// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const productRoutes = require('./routes/products.js');
const categoryRoutes = require('./routes/categories');

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

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});