import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plus, Edit, Trash2, X, Package, Tags } from 'lucide-react';
import Button from '../components/ui/Button';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [editingCategory, setEditingCategory] = useState<any | null>(null);
    
    // Check auth
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [token, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([
                axios.get(`${API_URL}/products`),
                axios.get(`${API_URL}/categories`)
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    const handleDeleteProduct = async (id: number) => {
        if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το προϊόν;')) {
            try {
                await axios.delete(`${API_URL}/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert('Αποτυχία διαγραφής προϊόντος.');
            }
        }
    };

    const handleEditProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${API_URL}/products/${editingProduct.id}`, editingProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.map(p => (p.id === data.id ? data : p)));
            setEditingProduct(null);
        } catch (err) {
            alert('Αποτυχία ενημέρωσης προϊόντος.');
        }
    };

    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory.id) {
                // Update
                const { data } = await axios.put(`${API_URL}/categories/${editingCategory.id}`, editingCategory, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(categories.map(c => (c.id === data.id ? data : c)));
            } else {
                // Create
                const { data } = await axios.post(`${API_URL}/categories`, editingCategory, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories([...categories, data]);
            }
            setEditingCategory(null);
        } catch (err) {
            alert('Αποτυχία αποθήκευσης κατηγορίας. Ίσως το όνομα υπάρχει ήδη.');
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν την κατηγορία;')) {
            try {
                await axios.delete(`${API_URL}/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(categories.filter(c => c.id !== id));
            } catch (err) {
                alert('Αποτυχία διαγραφής κατηγορίας.');
            }
        }
    };

    if (loading) return <div className="text-center py-20 flex justify-center"><div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-28">
                        <div className="px-4 py-3 mb-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900">Διαχείριση</h2>
                        </div>
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
                                    activeTab === 'products' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Package className="w-5 h-5 mr-3" /> Προϊόντα
                            </button>
                            <button
                                onClick={() => setActiveTab('categories')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
                                    activeTab === 'categories' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Tags className="w-5 h-5 mr-3" /> Κατηγορίες
                            </button>
                        </nav>
                        <div className="mt-8 pt-4 border-t border-gray-100">
                            <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
                                <LogOut className="w-5 h-5 mr-3" /> Αποσύνδεση
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
                        
                        {/* Products */}
                        {activeTab === 'products' && (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Προϊόντα</h2>
                                    <Button onClick={() => navigate('/products/add')} className="rounded-full">
                                        <Plus className="w-5 h-5 mr-2" /> Νέο Προϊόν
                                    </Button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tl-xl">ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Όνομα</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Τιμή</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tr-xl">Ενέργειες</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {products.map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{product.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toFixed(2)}€</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                        <button onClick={() => setEditingProduct(product)} className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors inline-block">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {products.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 mt-4">
                                                        Δεν βρέθηκαν προϊόντα. Ξεκινήστε προσθέτοντας ένα!
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {activeTab === 'categories' && (
                            <div>
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">Κατηγορίες</h2>
                                    <Button onClick={() => setEditingCategory({ name: '' })} className="rounded-full">
                                        <Plus className="w-5 h-5 mr-2" /> Νέα Κατηγορία
                                    </Button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tl-xl w-24">ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Όνομα</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tr-xl">Ενέργειες</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {categories.map((cat) => (
                                                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{cat.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                        <button onClick={() => setEditingCategory(cat)} className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors inline-block">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {categories.length === 0 && (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 mt-4">
                                                        Δεν βρέθηκαν κατηγορίες.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Επεξεργασία Προϊόντος</h2>
                            <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleEditProductSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Όνομα</label>
                                <input required type="text" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Τιμή</label>
                                <input required type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Περιγραφή</label>
                                <textarea required value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" rows={4}></textarea>
                            </div>
                            {/* Wait, the "Add/Edit Gallery" logic should really just be handled in the main /add page for complexity reasons, but simple edit is here */}
                            <Button type="submit" className="w-full py-4 rounded-xl text-lg mt-4">Αποθήκευση Αλλαγών</Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {editingCategory && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{editingCategory.id ? 'Επεξεργασία Κατηγορίας' : 'Νέα Κατηγορία'}</h2>
                            <button onClick={() => setEditingCategory(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleSaveCategory} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Όνομα Κατηγορίας</label>
                                <input required type="text" value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" />
                            </div>
                            <Button type="submit" className="w-full py-4 rounded-xl text-lg mt-4">Αποθήκευση</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
