import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ProductModal({ isOpen, onClose, onSave, product }) {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        stock: '',
        mrp: '',
        sellingPrice: '',
        brand: '',
        images: 0,
        exchangeEligibility: 'Yes'
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                name: '',
                type: '',
                stock: '',
                mrp: '',
                sellingPrice: '',
                brand: '',
                images: 0,
                exchangeEligibility: 'Yes'
            });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {product ? 'Edit Product' : 'Add Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
                    <form id="productForm" onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="CakeZone Walnut Brownie"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all appearance-none bg-white text-sm"
                                required
                            >
                                <option value="" disabled>Select product type</option>
                                <option value="Food">Food</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Beauty Products">Beauty Products</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Total numbers of Stock available"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">MRP</label>
                            <input
                                type="number"
                                name="mrp"
                                value={formData.mrp}
                                onChange={handleChange}
                                placeholder="Total MRP"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Selling Price</label>
                            <input
                                type="number"
                                name="sellingPrice"
                                value={formData.sellingPrice}
                                onChange={handleChange}
                                placeholder="Total selling price"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand Name</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Brand Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Product Images</label>
                            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                                <span className="text-sm text-gray-500 mb-1">Enter Description</span>
                                <span className="font-semibold text-gray-800 font-medium">Browse</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Exchange or return eligibility</label>
                            <select
                                name="exchangeEligibility"
                                value={formData.exchangeEligibility}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all appearance-none bg-white text-sm"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 shrink-0 flex justify-end bg-gray-50/50 border-t border-gray-100">
                    <button
                        type="submit"
                        form="productForm"
                        className="bg-[#1F29B6] hover:bg-[#151D85] text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        {product ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
}
