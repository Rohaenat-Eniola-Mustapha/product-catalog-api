const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const auth = require('../middleware/auth'); // Import auth middleware
const authorize = require('../middleware/authorize'); // Import authorize middleware

const {
    validateProductCreation,
    validateProductIdParam,
    validateProductUpdate,
} = require('../middleware/validation');

//  Combine the two POST /products routes into one
router.post('/', auth, authorize(['admin']), validateProductCreation, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', validateProductIdParam, productController.getProductById);
router.put('/:id', auth, authorize(['admin']), validateProductIdParam, validateProductUpdate, productController.updateProduct); //Added auth and authorize
router.delete('/:id', auth, authorize(['admin']), validateProductIdParam, productController.deleteProduct); //Added auth and authorize
router.get('/search', productController.searchProducts);

module.exports = router;