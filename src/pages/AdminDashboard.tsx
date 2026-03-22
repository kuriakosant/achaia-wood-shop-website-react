import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plus, Edit, Trash2, X, Package, Tags, Star, ChevronRight, Layers, ClipboardList, Download, LayoutTemplate, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
    // State for Wood
    const [woodProducts, setWoodProducts] = useState<any[]>([]);
    const [woodCategories, setWoodCategories] = useState<any[]>([]);

    // State for Gallery
    const [galleryProducts, setGalleryProducts] = useState<any[]>([]);
    const [galleryCategories, setGalleryCategories] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState<any[]>([]);

    // UI State
    const [activeShop, setActiveShop] = useState<'wood' | 'gallery'>('wood');
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'featured'>('products');

    // Featured tab filter state
    const [featuredShop, setFeaturedShop] = useState<'wood' | 'gallery'>('wood');
    const [featuredFilterCat, setFeaturedFilterCat] = useState<string>('');
    const [featuredFilterSub, setFeaturedFilterSub] = useState<string>('');
    const [featuredSearch, setFeaturedSearch] = useState<string>('');

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [wProd, wCat, gProd, gCat, ordRes] = await Promise.all([
                axios.get(`${API_URL}/wood-products`),
                axios.get(`${API_URL}/wood-categories`),
                axios.get(`${API_URL}/gallery-products`),
                axios.get(`${API_URL}/gallery-categories`),
                axios.get(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } }),
            ]);
            setWoodProducts(wProd.data);
            setWoodCategories(wCat.data);
            setGalleryProducts(gProd.data);
            setGalleryCategories(gCat.data);
            setOrders(ordRes.data);
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

    // Derived current state based on activeShop
    const products = activeShop === 'wood' ? woodProducts : galleryProducts;
    const setProducts = activeShop === 'wood' ? setWoodProducts : setGalleryProducts;

    const categories = activeShop === 'wood' ? woodCategories : galleryCategories;
    const setCategories = activeShop === 'wood' ? setWoodCategories : setGalleryCategories;

    const endpointPrefix = activeShop === 'wood' ? 'wood' : 'gallery';

    const handleDeleteProduct = async (id: number) => {
        if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το προϊόν;')) {
            try {
                await axios.delete(`${API_URL}/${endpointPrefix}-products/${id}`, {
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
            const { data } = await axios.put(`${API_URL}/${endpointPrefix}-products/${editingProduct.id}`, editingProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.map(p => (p.id === data.id ? data : p)));
            setEditingProduct(null);
        } catch (err) {
            alert('Αποτυχία ενημέρωσης προϊόντος. Βεβαιωθείτε ότι έχετε επιλέξει τις υποχρεωτικές κατηγορίες.');
        }
    };

    const handleToggleFeatured = async (product: any) => {
        try {
            const updatedProduct = { ...product, isFeatured: !product.isFeatured };
            const { data } = await axios.put(`${API_URL}/${endpointPrefix}-products/${product.id}`, updatedProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.map(p => (p.id === data.id ? data : p)));
        } catch (err) {
            alert('Αποτυχία ενημέρωσης κατάστασης (Featured).');
        }
    };

    // Toggle featured on ANY shop's product regardless of activeShop
    const handleToggleFeaturedAny = async (shopType: 'wood' | 'gallery', product: any) => {
        const updatedProduct = { ...product, isFeatured: !product.isFeatured };
        try {
            const { data } = await axios.put(`${API_URL}/${shopType}-products/${product.id}`, updatedProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (shopType === 'wood') {
                setWoodProducts(woodProducts.map(p => p.id === data.id ? data : p));
            } else {
                setGalleryProducts(galleryProducts.map(p => p.id === data.id ? data : p));
            }
        } catch (err) {
            alert('Αποτυχία ενημέρωσης κατάστασης (Featured).');
        }
    };

    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        // Determine Level based on Parent
        let level = 1;
        if (editingCategory.parentId) {
            const parent = categories.find(c => c.id === parseInt(editingCategory.parentId));
            if (parent) {
                level = parent.level + 1;
            }
        }

        const payload = { ...editingCategory, level, parentId: editingCategory.parentId || null };

        try {
            if (editingCategory.id) {
                const { data } = await axios.put(`${API_URL}/${endpointPrefix}-categories/${editingCategory.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(categories.map(c => (c.id === data.id ? data : c)));
            } else {
                const { data } = await axios.post(`${API_URL}/${endpointPrefix}-categories`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories([...categories, data]);
            }
            setEditingCategory(null);
        } catch (err) {
            alert('Αποτυχία αποθήκευσης κατηγορίας.');
        }
    };

    const handleDeleteCategory = async (id: number) => {
        // Prevent deleting if it has children
        const hasChildren = categories.some(c => c.parentId === id);
        if (hasChildren) {
            alert('Δεν μπορείτε να διαγράψετε αυτήν την κατηγορία γιατί περιέχει υποκατηγορίες. Παρακαλώ διαγράψτε πρώτα τις υποκατηγορίες.');
            return;
        }

        if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν την κατηγορία;')) {
            try {
                await axios.delete(`${API_URL}/${endpointPrefix}-categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(categories.filter(c => c.id !== id));
            } catch (err) {
                alert('Αποτυχία διαγραφής κατηγορίας.');
            }
        }
    };

    const handleUpdateOrderStatus = async (id: number, status: string) => {
        try {
            const { data } = await axios.put(`${API_URL}/orders/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(orders.map(o => (o.id === data.id ? data : o)));
        } catch (err) {
            alert('Αποτυχία ενημέρωσης κατάστασης παραγγελίας.');
        }
    };

    const handleDeleteOrder = async (id: number) => {
        if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την παραγγελία;')) {
            try {
                await axios.delete(`${API_URL}/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(orders.filter(o => o.id !== id));
            } catch (err) {
                alert('Αποτυχία διαγραφής παραγγελίας.');
            }
        }
    };

    if (loading) return <div className="text-center py-20 flex justify-center"><div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>;

    const mainCats = categories.filter(c => c.level === 1);
    const getSubCats = (parentId: number) => categories.filter(c => c.parentId === parentId);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="w-full md:w-72 shrink-0">
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-28">
                        <div className="px-4 py-3 mb-2 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900">Κατάστημα</h2>
                        </div>
                        <nav className="space-y-1 mb-6">
                            <button
                                onClick={() => setActiveShop('wood')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${activeShop === 'wood' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Layers className="w-5 h-5 mr-3 text-current" /> Βιομηχανική Ξυλεία
                            </button>
                            <button
                                onClick={() => setActiveShop('gallery')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${activeShop === 'gallery' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Layers className="w-5 h-5 mr-3 text-current" /> Προϊόντα Κιγκαλερίας
                            </button>
                        </nav>

                        <div className="px-4 py-3 mb-2 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900">Διαχείριση</h2>
                        </div>
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'products' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Package className="w-5 h-5 mr-3" /> Προϊόντα
                            </button>
                            <button
                                onClick={() => setActiveTab('categories')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'categories' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Tags className="w-5 h-5 mr-3" /> Κατηγορίες (Δέντρο)
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
                                    activeTab === 'orders' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <ClipboardList className="w-5 h-5 mr-3" /> Παραγγελίες
                            </button>
                            <button
                                onClick={() => setActiveTab('featured')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
                                    activeTab === 'featured' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <LayoutTemplate className="w-5 h-5 mr-3" /> Αρχική Σελίδα
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
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[600px]">

                        {/* Orders */}
                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-none mt-1 mb-8">Παραγγελίες</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tl-xl">Ημερομηνία</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Πελάτης / Τηλ.</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Οδηγίες</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Αρχείο</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Κατάσταση</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tr-xl">Ενέργειες</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(order.createdAt).toLocaleDateString('el-GR')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-bold text-gray-900">{order.customerName}</div>
                                                        <div className="text-xs text-gray-500">{order.phone}</div>
                                                        <div className="text-xs text-gray-400 mt-1">{order.documentType} | {order.paymentMethod}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                        {order.specialInstructions || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                                                        {order.fileUrl ? (
                                                            <a href={order.fileUrl} download={`Order_${order.id}`} className="text-green-600 hover:text-green-800 flex items-center font-medium bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                                                <Download className="w-4 h-4 mr-2" /> Λήψη
                                                            </a>
                                                        ) : <span className="text-gray-400">-</span>}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                            className={`text-sm rounded-lg py-1.5 px-3 border outline-none font-medium cursor-pointer ${
                                                                order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                order.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                                'bg-orange-50 text-orange-700 border-orange-200'
                                                            }`}
                                                        >
                                                            <option value="Pending">Εκκρεμεί</option>
                                                            <option value="Reviewed">Σε Επεξεργασία</option>
                                                            <option value="Completed">Ολοκληρώθηκε</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => handleDeleteOrder(order.id)}
                                                            className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                            title="Διαγραφή Παραγγελίας"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {orders.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                        Δεν βρέθηκαν παραγγελίες.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Products */}
                        {activeTab === 'products' && (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900 leading-none mt-1">Προϊόντα - {activeShop === 'wood' ? 'Ξυλεία' : 'Κιγκαλερία'}</h2>
                                    <Button onClick={() => navigate('/products/add')} className="rounded-full shrink-0 px-5">
                                        <Plus className="w-5 h-5 mr-1 sm:mr-2" /> Νέο Προϊόν
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleToggleFeatured(product)}
                                                            className={`p-2 rounded-lg transition-colors inline-block ${product.isFeatured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'}`}
                                                            title={product.isFeatured ? "Αφαίρεση από Προτεινόμενα" : "Προσθήκη στα Προτεινόμενα"}
                                                        >
                                                            <Star size={18} className={product.isFeatured ? "fill-current" : ""} />
                                                        </button>
                                                        <button onClick={() => setEditingProduct(product)} className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="Επεξεργασία">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors inline-block" title="Διαγραφή">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {products.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 mt-4">
                                                        Δεν βρέθηκαν προϊόντα σε αυτό το κατάστημα.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Categories Tree */}
                        {activeTab === 'categories' && (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900 leading-none mt-1">Δέντρο Κατηγοριών - {activeShop === 'wood' ? 'Ξυλεία' : 'Κιγκαλερία'}</h2>
                                    <Button onClick={() => setEditingCategory({ name: '', parentId: '' })} className="rounded-full shrink-0 px-5">
                                        <Plus className="w-5 h-5 mr-1 sm:mr-2" /> Νέα Κατηγορία
                                    </Button>
                                </div>
                                <div className="bg-gray-50 rounded-[2rem] p-6 sm:p-8 border border-gray-100">
                                    {mainCats.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                            Δεν υπάρχουν κατηγορίες. Δημιουργήστε την πρώτη σας Κύρια Κατηγορία.
                                        </div>
                                    ) : (
                                        <ul className="space-y-4">
                                            {mainCats.map(mainCat => (
                                                <li key={mainCat.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-gray-900 text-lg flex items-center"><Layers className="w-5 h-5 mr-2 text-green-600" />{mainCat.name} <span className="text-xs font-normal bg-green-100 text-green-700 px-2 py-1 rounded-md ml-3">Level 1 (Κύρια)</span></span>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => setEditingCategory(mainCat)} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                                                            <button onClick={() => handleDeleteCategory(mainCat.id)} className="text-red-600 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>

                                                    {/* Sub 1 */}
                                                    {getSubCats(mainCat.id).length > 0 && (
                                                        <ul className="ml-6 space-y-3 mt-4 border-l-2 border-green-100 pl-4">
                                                            {getSubCats(mainCat.id).map(sub1 => (
                                                                <li key={sub1.id} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="font-semibold text-gray-800 flex items-center text-md"><ChevronRight className="w-4 h-4 mr-1 text-gray-400" /> {sub1.name} <span className="text-xs font-normal bg-orange-100 text-orange-700 px-2 pl-2 pr-2 py-0.5 rounded-md ml-3">Level 2 (Sub 1)</span></span>
                                                                        <div className="flex gap-2">
                                                                            <button onClick={() => setEditingCategory(sub1)} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                                                                            <button onClick={() => handleDeleteCategory(sub1.id)} className="text-red-600 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                                                        </div>
                                                                    </div>

                                                                    {/* Sub 2 */}
                                                                    {getSubCats(sub1.id).length > 0 && (
                                                                        <ul className="ml-6 space-y-2 mt-3 pl-4 border-l border-dashed border-gray-300">
                                                                            {getSubCats(sub1.id).map(sub2 => (
                                                                                <li key={sub2.id} className="flex justify-between items-center bg-white rounded-lg p-2 px-3 border border-gray-100">
                                                                                    <span className="text-gray-600 text-sm flex items-center">- {sub2.name} <span className="text-[10px] font-normal bg-gray-200 text-gray-700 px-1 py-0.5 rounded ml-2">Level 3 (Sub 2)</span></span>
                                                                                    <div className="flex gap-1">
                                                                                        <button onClick={() => setEditingCategory(sub2)} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><Edit size={14} /></button>
                                                                                        <button onClick={() => handleDeleteCategory(sub2.id)} className="text-red-600 p-1 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Featured / Homepage Tab ── */}
                        {activeTab === 'featured' && (() => {
                            // All products from both shops tagged with shopType
                            const allWood    = woodProducts.map((p: any)    => ({ ...p, shopType: 'wood'    as const }));
                            const allGallery = galleryProducts.map((p: any) => ({ ...p, shopType: 'gallery' as const }));

                            // Currently featured across BOTH shops
                            const featured = [...allWood, ...allGallery].filter(p => p.isFeatured);

                            // Browse pool — right panel
                            const browseCats  = featuredShop === 'wood' ? woodCategories    : galleryCategories;
                            const mainCatsF   = browseCats.filter((c: any) => c.level === 1);
                            const subCatsF    = featuredFilterCat
                                ? browseCats.filter((c: any) => Number(c.parentId) === Number(featuredFilterCat) && c.level === 2)
                                : [];
                            const browsePool  = (featuredShop === 'wood' ? allWood : allGallery)
                                .filter((p: any) => {
                                    if (featuredFilterCat && Number(p.mainCategoryId) !== Number(featuredFilterCat)) return false;
                                    if (featuredFilterSub && Number(p.subCategoryId1) !== Number(featuredFilterSub)) return false;
                                    if (featuredSearch && !p.name.toLowerCase().includes(featuredSearch.toLowerCase())) return false;
                                    return true;
                                });

                            return (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 leading-none mt-1">Αρχική Σελίδα — Προτεινόμενα Προϊόντα</h2>
                                        <p className="text-sm text-gray-500 mt-2">Επιλέξτε ποια προϊόντα εμφανίζονται στο τμήμα "Τα Προϊόντα μας" της αρχικής σελίδας. Εμφανίζονται τα πρώτα 3 με ⭐.</p>
                                    </div>

                                    <div className="flex flex-col xl:flex-row gap-8">

                                        {/* ── Left: Currently Featured ── */}
                                        <div className="w-full xl:w-80 shrink-0">
                                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-bold text-amber-900 flex items-center gap-2">
                                                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                                        Τρέχοντα Προτεινόμενα
                                                    </h3>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${featured.length > 3 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {featured.length} / ∞
                                                    </span>
                                                </div>

                                                {featured.length > 3 && (
                                                    <p className="text-xs text-amber-700 bg-amber-100 rounded-lg px-3 py-2 mb-3">
                                                        ⚠️ Εμφανίζονται μόνο τα πρώτα 3. Αφαιρέστε κάποια για καλύτερη εμφάνιση.
                                                    </p>
                                                )}

                                                {featured.length === 0 ? (
                                                    <p className="text-sm text-amber-700 text-center py-6 opacity-70">Δεν υπάρχουν προτεινόμενα προϊόντα.<br/>Επιλέξτε από τη λίστα δεξιά.</p>
                                                ) : (
                                                    <ul className="space-y-3">
                                                        {featured.map((p: any) => (
                                                            <li key={`${p.shopType}-${p.id}`} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-amber-100 shadow-sm">
                                                                {p.image && (
                                                                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100" />
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block ${p.shopType === 'wood' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                                                                        {p.shopType === 'wood' ? 'Ξυλεία' : 'Gallery'}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleToggleFeaturedAny(p.shopType, p)}
                                                                    title="Αφαίρεση από Προτεινόμενα"
                                                                    className="p-1.5 text-amber-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                        {/* ── Right: Product Browser ── */}
                                        <div className="flex-1 min-w-0">
                                            {/* Shop toggle */}
                                            <div className="flex gap-3 mb-5">
                                                <button
                                                    onClick={() => { setFeaturedShop('wood'); setFeaturedFilterCat(''); setFeaturedFilterSub(''); }}
                                                    className={`flex-1 py-2.5 rounded-xl font-semibold text-sm border transition-all ${featuredShop === 'wood' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    🌲 Βιομηχανική Ξυλεία
                                                </button>
                                                <button
                                                    onClick={() => { setFeaturedShop('gallery'); setFeaturedFilterCat(''); setFeaturedFilterSub(''); }}
                                                    className={`flex-1 py-2.5 rounded-xl font-semibold text-sm border transition-all ${featuredShop === 'gallery' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    🪑 Εκθεση - Gallery
                                                </button>
                                            </div>

                                            {/* Filters */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Αναζήτηση ονόματος..."
                                                        value={featuredSearch}
                                                        onChange={e => setFeaturedSearch(e.target.value)}
                                                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300"
                                                    />
                                                </div>
                                                <select
                                                    value={featuredFilterCat}
                                                    onChange={e => { setFeaturedFilterCat(e.target.value); setFeaturedFilterSub(''); }}
                                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-700"
                                                >
                                                    <option value="">Όλες οι κατηγορίες</option>
                                                    {mainCatsF.map((c: any) => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={featuredFilterSub}
                                                    onChange={e => setFeaturedFilterSub(e.target.value)}
                                                    disabled={!featuredFilterCat || subCatsF.length === 0}
                                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                                                >
                                                    <option value="">Όλες οι υποκατηγορίες</option>
                                                    {subCatsF.map((c: any) => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Product grid */}
                                            {browsePool.length === 0 ? (
                                                <div className="bg-gray-50 rounded-2xl text-center py-16 text-gray-400 border border-dashed border-gray-200">
                                                    Δεν βρέθηκαν προϊόντα για τα επιλεγμένα φίλτρα.
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-1">
                                                    {browsePool.map((p: any) => (
                                                        <div key={p.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all ${p.isFeatured ? 'border-amber-300 ring-2 ring-amber-200' : 'border-gray-100 hover:shadow-md'}`}>
                                                            {p.image ? (
                                                                <img src={p.image} alt={p.name} className="w-full h-36 object-cover" />
                                                            ) : (
                                                                <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-300 text-3xl">📦</div>
                                                            )}
                                                            <div className="p-3 flex flex-col gap-2 flex-1">
                                                                <p className="text-sm font-semibold text-gray-900 leading-tight">{p.name}</p>
                                                                <p className="text-xs text-gray-500">{p.price.toFixed(2)}€</p>
                                                                <button
                                                                    onClick={() => handleToggleFeaturedAny(p.shopType, p)}
                                                                    className={`mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                                                                        p.isFeatured
                                                                            ? 'bg-amber-400 text-white hover:bg-amber-500'
                                                                            : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                                                                    }`}
                                                                >
                                                                    <Star className={`w-3.5 h-3.5 ${p.isFeatured ? 'fill-white' : ''}`} />
                                                                    {p.isFeatured ? 'Αφαίρεση από Αρχική' : 'Προσθήκη στην Αρχική'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] max-w-xl w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Επεξεργασία Προϊόντος</h2>
                            <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleEditProductSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Όνομα</label>
                                <input required type="text" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Τιμή (€)</label>
                                    <input required type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Κατασκευαστής</label>
                                    <input type="text" value={editingProduct.company || ''} onChange={e => setEditingProduct({ ...editingProduct, company: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" />
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                                <h3 className="font-bold text-gray-900">Κατηγοριοποίηση</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Κύρια Κατηγορία *</label>
                                    <select required value={editingProduct.mainCategoryId || ''} onChange={e => setEditingProduct({ ...editingProduct, mainCategoryId: parseInt(e.target.value), subCategoryId1: null, subCategoryId2: null })} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none">
                                        <option value="" disabled>Επιλογή Κύριας Κατηγορίας</option>
                                        {categories.filter(c => c.level === 1).map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Υποκατηγορία *</label>
                                    <select required disabled={!editingProduct.mainCategoryId} value={editingProduct.subCategoryId1 || ''} onChange={e => setEditingProduct({ ...editingProduct, subCategoryId1: parseInt(e.target.value), subCategoryId2: null })} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none disabled:bg-gray-100">
                                        <option value="" disabled>Επιλογή υποκατηγορίας</option>
                                        {categories.filter(c => Number(c.parentId) === Number(editingProduct.mainCategoryId) && c.level === 2).map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Level 3 company — Gallery only */}
                                {activeShop === 'gallery' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Εταιρεία / Κατασκευαστής (Προαιρετικό)</label>
                                        <select disabled={!editingProduct.subCategoryId1} value={editingProduct.subCategoryId2 || ''} onChange={e => setEditingProduct({ ...editingProduct, subCategoryId2: e.target.value ? parseInt(e.target.value) : null })} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none disabled:bg-gray-100">
                                            <option value="">Καμία</option>
                                            {categories.filter(c => Number(c.parentId) === Number(editingProduct.subCategoryId1) && c.level === 3).map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Περιγραφή</label>
                                <textarea required value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" rows={4}></textarea>
                            </div>
                            <Button type="submit" className="w-full py-4 rounded-xl text-lg mt-4">Αποθήκευση Αλλαγών</Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Edit Modal */}
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
                                <input required type="text" value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none" placeholder="π.χ. Πόρτες" />
                            </div>

                            {!editingCategory.id && ( // Only allow setting parent on creation for simplicity, or we can allow moving tree
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Υπάγεται σε (Γονέα)</label>
                                    <select value={editingCategory.parentId || ''} onChange={e => setEditingCategory({ ...editingCategory, parentId: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none">
                                        <option value="">ΚΑΜΙΑ (Κύρια Κατηγορία Level 1)</option>
                                        {/* Show only Level 1 and Level 2 as possible parents (max depth 3) */}
                                        {categories.filter(c => c.level < 3).map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.level === 1 ? `[Level 1] ${cat.name}` : `   [Level 2] ${cat.name}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <Button type="submit" className="w-full py-4 rounded-xl text-lg mt-4">Αποθήκευση</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
