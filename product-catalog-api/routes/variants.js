const express = require('express');
const router = express.Router({ mergeParams: true });
const variantController = require('../controllers/variants');
const { validateProductIdParam } = require('../middleware/validation');

// Create a product variant
router.post('/', validateProductIdParam, variantController.createVariant);

// Update a product variant
router.put('/:variantId', validateProductIdParam, variantController.updateVariant);

// Delete a product variant
router.delete('/:variantId', validateProductIdParam, variantController.deleteVariant);

module.exports = router;