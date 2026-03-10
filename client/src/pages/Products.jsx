import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';
import api from '../services/api';

export default function Products() {
    const [activeTab, setActiveTab] = useState('published');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get('/api/products');
            // Map _id to id to maintain compatibility with existing UI components
            const mappedData = data.map(p => ({ ...p, id: p._id }));
            setProducts(mappedData);
        } catch (error) {
            console.error('Error fetching products:', error);
            showToast('Failed to load products', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredProducts = products.filter(p => p.status === activeTab);

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (product) => {
        setDeletingProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/products/${deletingProduct.id}`);
            setProducts(products.filter(p => p.id !== deletingProduct.id));
            setIsDeleteModalOpen(false);
            showToast('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('Failed to delete product', 'error');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'unpublished' : 'published';
        try {
            await api.patch(`/api/products/${id}/status`, { status: newStatus });
            setProducts(products.map(p => p.id === id ? { ...p, status: newStatus } : p));
            showToast(`Product ${newStatus} successfully`);
        } catch (error) {
            console.error('Error toggling status:', error);
            showToast('Failed to update product status', 'error');
        }
    };

    const handleSaveProduct = async (productData) => {
        try {
            if (editingProduct) {
                // Update
                const { data } = await api.put(`/api/products/${editingProduct.id}`, productData);
                const updatedItem = { ...data, id: data._id };
                setProducts(products.map(p => p.id === editingProduct.id ? updatedItem : p));
                showToast('Product updated successfully');
            } else {
                // Create
                const payload = {
                    ...productData,
                    status: activeTab, // Create in current tab
                };
                const { data } = await api.post('/api/products', payload);
                const newItem = { ...data, id: data._id };
                setProducts([newItem, ...products]);
                showToast('Product added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving product:', error);
            showToast('Failed to save product', 'error');
        }
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* Page Header (Title + Add Button + Tabs) */}
            <div className="flex flex-col mb-6 gap-6">
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <button
                        onClick={handleAddClick}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors border border-gray-200"
                    >
                        <Plus className="w-5 h-5 text-gray-500" />
                        Add Products
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-2">
                    <button
                        onClick={() => setActiveTab('published')}
                        className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'published'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => setActiveTab('unpublished')}
                        className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'unpublished'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Unpublished
                    </button>
                </div>
            </div>

            {/* Product List or Empty State */}
            <div className="flex-1 overflow-auto relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F29B6]"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 mb-6 text-[#1F29B6] opacity-90 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <path d="M14 17.5h7m-3.5-3.5v7" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Products
                        </h2>
                        <p className="text-sm text-gray-500 max-w-sm">
                            Your {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Products will appear here.<br />
                            Create your first product to {activeTab === 'published' ? 'publish' : 'unpublish'}.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                                onToggleStatus={handleToggleStatus}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Toast Notification positioned at exact bottom center like Figma */}
            <Toast message={toast.message} isVisible={toast.show} onClose={() => setToast({ show: false, message: '' })} />

            {/* Modals */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                product={editingProduct}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                productName={deletingProduct?.name}
            />
        </div>
    );
}
