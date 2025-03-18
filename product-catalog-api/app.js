const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [];
const categories = [];

// Product Endpoints
app.post('/products', (req, res) => {
    const { name, description, price, categoryId, inventory = 0, discount = 0 } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Missing required field: name' });
    }
    if (!description) {
        return res.status(400).json({ error: 'Missing required field: description' });
    }
    if (price === undefined) {
        return res.status(400).json({ error: 'Missing required field: price' });
    }
    if (categoryId === undefined) {
        return res.status(400).json({ error: 'Missing required field: categoryId' });
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number' });
    }
    if (isNaN(parseInt(categoryId)) || parseInt(categoryId) <= 0) {
        return res.status(400).json({ error: 'CategoryId must be a positive integer' });
    }
    const categoryExists = categories.some((c) => c.id === parseInt(categoryId));
    if (!categoryExists) {
        return res.status(400).json({ error: 'Invalid categoryId' });
    }
    if (inventory !== undefined && isNaN(parseInt(inventory))) {
        return res.status(400).json({ error: 'Inventory must be an integer' });
    }
    if (discount !== undefined && (isNaN(parseFloat(discount)) || parseFloat(discount) < 0 || parseFloat(discount) > 100)) {
        return res.status(400).json({ error: 'Discount must be a number between 0 and 100' });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId), // Store the category ID
        inventory: parseInt(inventory),
        discount: parseFloat(discount)
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
    const { name, description, price, categoryId, inventory, discount } = req.body;

    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (categoryId !== undefined) {
        if (isNaN(parseInt(categoryId)) || parseInt(categoryId) <= 0) {
            return res.status(400).json({ error: 'CategoryId must be a positive integer' });
        }
        const categoryExists = categories.some((c) => c.id === parseInt(categoryId));
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid categoryId' });
        }
        products[productIndex].categoryId = parseInt(categoryId);
    }

    if (price !== undefined) {
        if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }
        products[productIndex].price = parseFloat(price);
    }

    if (inventory !== undefined) {
        if (isNaN(parseInt(inventory))) {
            return res.status(400).json({ error: 'Inventory must be an integer' });
        }
        products[productIndex].inventory = parseInt(inventory);
    }

    if (discount !== undefined) {
        if (isNaN(parseFloat(discount)) || parseFloat(discount) < 0 || parseFloat(discount) > 100) {
            return res.status(400).json({ error: 'Discount must be a number between 0 and 100' });
        }
        products[productIndex].discount = parseFloat(discount);
    }

    // Update name and description if provided
    if (name) products[productIndex].name = name;
    if (description) products[productIndex].description = description;

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

// Get product inventory
app.get('/products/:id/inventory', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ inventory: product.inventory });
});

// Update product inventory
app.put('/products/:id/inventory', (req, res) => {
    const productId = parseInt(req.params.id);
    const { inventory } = req.body;
    if (inventory === undefined) {
        return res.status(400).json({ error: 'Missing inventory value' });
    }
    if (isNaN(parseInt(inventory))) {
        return res.status(400).json({ error: 'Inventory must be an integer' });
    }
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products[productIndex].inventory = parseInt(inventory);
    res.json({ message: 'Inventory updated successfully', inventory: products[productIndex].inventory });
});

// Category Endpoints
app.post('/categories', (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Missing required field: name' });
    }
    if (!description) {
        return res.status(400).json({ error: 'Missing required field: description' });
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