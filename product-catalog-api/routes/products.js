const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const {
    validateProductCreation,
    validateProductIdParam,
    validateProductUpdate,
} = require('../middleware/validation');

router.post('/', validateProductCreation, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', validateProductIdParam, productController.getProductById);
router.put('/:id', validateProductIdParam, validateProductUpdate, productController.updateProduct);
router.delete('/:id', validateProductIdParam, productController.deleteProduct);

module.exports = router;