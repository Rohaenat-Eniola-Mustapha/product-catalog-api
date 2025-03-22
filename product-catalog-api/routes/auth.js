const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');

router.post('/', [body('email', 'Please include a valid email').isEmail(), body('password', 'Password is required').exists()], authController.authUser);

module.exports = router;