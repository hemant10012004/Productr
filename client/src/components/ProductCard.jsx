import { Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete, onToggleStatus }) {
    const isPublished = product.status === 'published';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            {/* Image Area */}
            <div className="h-48 bg-gray-50 flex items-center justify-center p-4 relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                />
                {/* Pagination Dots (Mock) */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
            </div>

            {/* Details Area */}
            <div className="p-5 flex-1 flex flex-col text-sm">
                <h3 className="font-semibold text-gray-800 text-base mb-4 truncate" title={product.name}>
                    {product.name}
                </h3>

                <div className="space-y-2.5 flex-1">
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">Product type -</span>
                        <span className="font-medium">{product.type}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">Quantity Stock -</span>
                        <span className="font-medium">{product.stock}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">MRP -</span>
                        <span className="font-medium">₹ {product.mrp}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">Selling Price -</span>
                        <span className="font-medium">₹ {product.sellingPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">Brand Name -</span>
                        <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">Total Number of images -</span>
                        <span className="font-medium">{product.images}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-gray-400">Exchange Eligibility -</span>
                        <span className="font-medium font-semibold">{product.exchangeEligibility}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={() => onToggleStatus(product.id, product.status)}
                        className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-white ${isPublished ? 'bg-[#1F29B6] hover:bg-[#151D85]' : 'bg-[#4CAF50] hover:bg-[#3D8C40]'
                            }`}
                    >
                        {isPublished ? 'Unpublish' : 'Publish'}
                    </button>

                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(product)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
