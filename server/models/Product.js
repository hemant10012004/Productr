const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add a product name'],
    },
    type: {
        type: String,
        required: [true, 'Please add a product type'],
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0,
    },
    mrp: {
        type: Number,
        required: [true, 'Please add MRP'],
        default: 0,
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Please add selling price'],
        default: 0,
    },
    brand: {
        type: String,
        required: [true, 'Please add brand name'],
    },
    images: {
        type: Number,
        default: 1, // Represents number of photos as per Figma
    },
    exchangeEligibility: {
        type: String,
        enum: ['YES', 'NO'],
        default: 'NO',
    },
    status: {
        type: String,
        enum: ['published', 'unpublished'],
        default: 'published',
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', // Placeholder from UI
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
