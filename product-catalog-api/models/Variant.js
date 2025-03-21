const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    size: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true},
});

module.exports = mongoose.model('Variant', VariantSchema);