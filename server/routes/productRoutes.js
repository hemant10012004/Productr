const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    updateProduct,
    toggleProductStatus,
    deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected by the auth middleware
router.use(protect);

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/:id/status')
    .patch(toggleProductStatus);

module.exports = router;
