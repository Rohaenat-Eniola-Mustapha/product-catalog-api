const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [];
const categories = [];

// Product Endpoints
app.post('/products', (req, res) => {
    const { name, description, price, categoryId } = req.body;
    if (!name || !description || price === undefined || categoryId === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Basic check if the category exists
    const categoryExists = categories.some((c) => c.id === parseInt(categoryId));
    if (!categoryExists) {
        return res.status(400).json({ error: 'Invalid categoryId' });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        description,
        price,
        categoryId: parseInt(categoryId), // Store the category ID
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get('/products', (req, res) => {
    res.json(products);
});

// Update a product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price, categoryId } = req.body;

    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Basic check if the category exists (if categoryId is provided)
    if (categoryId !== undefined) {
        const categoryExists = categories.some((c) => c.id === parseInt(categoryId));
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid categoryId' });
        }
        products[productIndex].categoryId = parseInt(categoryId);
    }

    // Update other fields if provided
    if (name) products[productIndex].name = name;
    if (description) products[productIndex].description = description;
    if (price !== undefined) products[productIndex].price = price;

    res.json(products[productIndex]);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products.splice(productIndex, 1);
    res.status(204).send(); // 204 No Content for successful deletion
});

// Product Search Endpoint
app.get('/products/search', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Missing search query' });
    }

    const searchTerm = query.toLowerCase();

    const searchResults = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    });

    res.json(searchResults);
});

// Category Endpoints
app.post('/categories', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Missing required fields for category' });
    }
    const newCategory = {
        id: categories.length + 1,
        name,
        description,
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

app.get('/categories', (req, res) => {
    res.json(categories);
});

app.get('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find((c) => c.id === categoryId);
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
});

app.put('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name, description } = req.body;
    const categoryIndex = categories.findIndex((c) => c.id === categoryId);
    if (categoryIndex === -1) {
        return res.status(404).json({ error: 'Category not found' });
    }
    categories[categoryIndex] = { ...categories[categoryIndex], name, description };
    res.json(categories[categoryIndex]);
});

app.delete('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex((c) => c.id === categoryId);
    if (categoryIndex === -1) {
        return res.status(404).json({ error: 'Category not found' });
    }
    categories.splice(categoryIndex, 1);
    res.status(204).send(); // 204 No Content for successful deletion
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});