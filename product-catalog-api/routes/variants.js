const express = require('express');
const router = express.Router({ mergeParams: true }); // Important for accessing productId
const variantController = require('../controllers/variants');
const {
    validateProductIdParam // Assuming you have this
} = require('../middleware/validation');

// Create a product variant
router.post('/', validateProductIdParam, variantController.createVariant);

// Update a product variant
router.put('/:variantId', validateProductIdParam, variantController.updateVariant);

// Delete a product variant
router.delete('/:variantId', validateProductIdParam, variantController.deleteVariant);

module.exports = router;