// const { body, param, validationResult } = require('express-validator');
const { body, param, validationResult, isMongoId } = require('express-validator');

// Generic validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Product Validators
const validateProductCreation = [
    body('name').isString().notEmpty().trim(),
    body('description').isString(),
    body('price').isFloat({ min: 0 }),
    body('categoryId').isMongoId().withMessage('Invalid categoryId'),
    body('inventory').isInt({ min: 0 }).optional(),
    body('discount').isFloat({ min: 0, max: 100 }).optional(),
    handleValidationErrors,
];

const validateProductIdParam = [
    (req, res, next) => {
        console.log("req.params:", req.params); // Keep this for debugging
        next();
    },
    param('productId').isMongoId().withMessage('Invalid productId'),
    handleValidationErrors,
];

const validateProductUpdate = [
    body('name').isString().notEmpty().trim().optional(),
    body('description').isString().optional(),
    body('price').isFloat({ min: 0 }).optional(),
    body('categoryId').isMongoId().withMessage('Invalid categoryId').optional(),
    body('inventory').isInt({ min: 0 }).optional(),
    body('discount').isFloat({ min: 0, max: 100 }).optional(),
    handleValidationErrors,
];

// Category Validators
const validateCategoryCreation = [
    body('name').isString().notEmpty().trim(),
    body('description').isString(),
    handleValidationErrors,
];

const validateCategoryIdParam = [
    param('id').isMongoId().withMessage('Invalid categoryId'),
    handleValidationErrors,
];

const validateCategoryUpdate = [
    body('name').isString().notEmpty().trim().optional(),
    body('description').isString().optional(),
    handleValidationErrors,
];

const validateVariantIdParam = [
    param('variantId').isMongoId().withMessage('Invalid variantId'),
    handleValidationErrors,
];

module.exports = {
    handleValidationErrors,
    validateProductCreation,
    validateProductIdParam,
    validateProductUpdate,
    validateCategoryCreation,
    validateCategoryIdParam,
    validateCategoryUpdate,
    validateVariantIdParam,
};