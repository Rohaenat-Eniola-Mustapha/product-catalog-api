const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const productRoutes = require('./routes/products.js');
const categoryRoutes = require('./routes/categories');
const reportRoutes = require('./routes/reports'); // Import report routes
const variantRoutes = require('./routes/variants'); // Import variant routes

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
app.use('/reports', reportRoutes); // Mount report routes
app.use('/products/:productId/variants', variantRoutes); // Mount variant routes under products

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});