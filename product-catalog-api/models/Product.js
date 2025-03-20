const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    inventory: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
});

module.exports = mongoose.model('Product', ProductSchema);