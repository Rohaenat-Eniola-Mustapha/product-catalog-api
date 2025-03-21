// routes/variants.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const variantController = require('../controllers/variants');
const { validateProductIdParam, validateVariantIdParam } = require('../middleware/validation');

// Create a product variant
router.post('/:productId/variants', validateProductIdParam, variantController.createVariant);

// Update a product variant
router.put('/:productId/variants/:variantId', validateProductIdParam, validateVariantIdParam, variantController.updateVariant);

// Delete a product variant
router.delete('/:productId/variants/:variantId', validateProductIdParam, validateVariantIdParam, variantController.deleteVariant);

module.exports = router;