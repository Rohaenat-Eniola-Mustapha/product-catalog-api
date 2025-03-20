const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const {
    validateCategoryCreation,
    validateCategoryIdParam,
    validateCategoryUpdate,
} = require('../middleware/validation');

router.post('/', validateCategoryCreation, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', validateCategoryIdParam, categoryController.getCategoryById);
router.put('/:id', validateCategoryIdParam, validateCategoryUpdate, categoryController.updateCategory);
router.delete('/:id', validateCategoryIdParam, categoryController.deleteCategory);

module.exports = router;