const Product = require('../models/Product');
const Variant = require('../models/Variant');

const createVariant = async (req, res) => {
    try {
        const productId = req.params.productId; //Corrected productId usage.
        const { size, color, material } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newVariant = new Variant({
            size,
            color,
            material,
        });

        const savedVariant = await newVariant.save();
        product.variants.push(savedVariant._id);
        await product.save();

        res.status(201).json(savedVariant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateVariant = async (req, res) => {
    try {
        const productId = req.params.productId;
        const variantId = req.params.variantId;
        const { size, color, ...otherVariantDetails } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const variantToUpdate = product.variants.id(variantId);
        if (!variantToUpdate) {
            return res.status(404).json({ error: 'Variant not found' });
        }

        if (size) variantToUpdate.size = size;
        if (color) variantToUpdate.color = color;
        Object.keys(otherVariantDetails).forEach(key => {
            variantToUpdate[key] = otherVariantDetails[key];
        });

        await product.save();
        res.json(variantToUpdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVariant = async (req, res) => {
    try {
        const productId = req.params.productId;
        const variantId = req.params.variantId;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.variants.pull(variantId);
        await product.save();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createVariant,
    updateVariant,
    deleteVariant
};