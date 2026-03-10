const Product = require('../models/Product');

// @desc    Get all products for logged in user
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    try {
        const { name, type, stock, mrp, sellingPrice, brand, images, exchangeEligibility, status, imageUrl } = req.body;

        if (!name || !type || !brand) {
            return res.status(400).json({ message: 'Please provide required fields: name, type, and brand' });
        }

        const product = await Product.create({
            user: req.user.id,
            name,
            type,
            stock,
            mrp,
            sellingPrice,
            brand,
            images,
            exchangeEligibility,
            status,
            imageUrl
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Make sure the logged in user matches the product user
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this product' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Toggle product status (published/unpublished)
// @route   PATCH /api/products/:id/status
// @access  Private
const toggleProductStatus = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this product' });
        }

        const { status } = req.body;
        if (!['published', 'unpublished'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        product.status = status;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this product' });
        }

        await product.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    toggleProductStatus,
    deleteProduct
};
