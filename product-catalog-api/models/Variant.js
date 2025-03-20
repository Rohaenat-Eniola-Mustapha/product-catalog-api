const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    size: String,
    color: String,
    // Add other variant details here
});

module.exports = mongoose.model('Variant', VariantSchema);