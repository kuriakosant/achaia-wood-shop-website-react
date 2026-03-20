import React, { useState, useEffect } from 'react';
import { ArrowLeft, UploadCloud, X, Loader2, Trash2, LayoutGrid, Layers, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/ui/Button';
import { compressImageToBase64 } from '../utils/imageCompression';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AddProductPage: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const [shopType, setShopType] = useState<'wood' | 'gallery'>('wood');
    const [categories, setCategories] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        company: '',
        description: '',
        features: '',
        mainCategoryId: '' as string | number,
        subCategoryId1: '' as string | number,
        subCategoryId2: '' as string | number,
        image: '', // Base64 thumbnail
        gallery: [] as string[], // Base64 array
        sku: ''
    });

    // Reset categories when shop changes
    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        
        // Reset category selection
        setFormData(prev => ({ ...prev, mainCategoryId: '', subCategoryId1: '', subCategoryId2: '' }));
        
        // Fetch new category list
        axios.get(`${API_URL}/${shopType}-categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error('Failed to load categories', err));
    }, [shopType, token, navigate]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'mainCategoryId') {
             setFormData(prev => ({ ...prev, mainCategoryId: value ? parseInt(value) : '', subCategoryId1: '', subCategoryId2: '' }));
        } else if (name === 'subCategoryId1') {
             setFormData(prev => ({ ...prev, subCategoryId1: value ? parseInt(value) : '', subCategoryId2: '' }));
        } else if (name === 'subCategoryId2') {
             setFormData(prev => ({ ...prev, subCategoryId2: value ? parseInt(value) : '' }));
        } else {
             setFormData(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await compressImageToBase64(e.target.files[0], { maxWidthOrHeight: 1200, maxSizeMB: 0.5 });
                setFormData(prev => ({ ...prev, image: base64 }));
            } catch (err: any) {
                alert(err.message || 'Σφάλμα κατά την συμπίεση ή ανάγνωση της εικόνας.');
            }
        }
    };

    const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const currentCount = formData.gallery.length;
            const filesArray = Array.from(e.target.files);
            
            const allowedFiles = filesArray.slice(0, 4 - currentCount);
            
            if (filesArray.length > allowedFiles.length) {
                alert('Επιτρέπονται το πολύ 4 επιπλέον φωτογραφίες συνολικά.');
            }
            
            if (allowedFiles.length > 0) {
                try {
                    const newImages = await Promise.all(
                        allowedFiles.map(file => compressImageToBase64(file, { maxWidthOrHeight: 1200, maxSizeMB: 0.5 }))
                    );
                    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
                } catch (err: any) {
                    alert(err.message || 'Σφάλμα κατά την συμπίεση των εικόνων.');
                }
            }
        }
    };

    const removeGalleryImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.mainCategoryId || !formData.subCategoryId1) {
             setError('Η επιλογή Κύριας Κατηγορίας (Level 1) και Yποκατηγορίας 1 (Level 2) είναι υποχρεωτική.');
             return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.post(`${API_URL}/${shopType}-products`, {
                ...formData,
                price: parseFloat(formData.price),
                features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
                subCategoryId2: formData.subCategoryId2 || null
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Redirect back to admin portal
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Παρουσιάστηκε σφάλμα κατά την αποθήκευση.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <Link to="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-green-600 font-medium mb-8 group transition-colors">
                    <ArrowLeft className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    Πίσω στη Διαχείριση
                </Link>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Νέο Προϊόν</h1>
                        <p className="text-gray-500">Συμπληρώστε τα στοιχεία και ανεβάστε φωτογραφίες του νέου προϊόντος.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-8 border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* 1. Shop Selection */}
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                             <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><Layers className="w-5 h-5 mr-2 text-green-600"/>Επιλογή Καταστήματος</h2>
                             <div className="flex flex-col sm:flex-row gap-4">
                                 <label className={`flex-1 flex px-4 border text-center justify-center py-4 rounded-xl cursor-pointer transition-all ${shopType === 'wood' ? 'bg-green-50 border-green-500 text-green-700 font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                     <input type="radio" name="shopType" value="wood" checked={shopType === 'wood'} onChange={() => setShopType('wood')} className="hidden" />
                                     Βιομηχανική Ξυλεία
                                 </label>
                                 <label className={`flex-1 flex px-4 border text-center justify-center py-4 rounded-xl cursor-pointer transition-all ${shopType === 'gallery' ? 'bg-green-50 border-green-500 text-green-700 font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                     <input type="radio" name="shopType" value="gallery" checked={shopType === 'gallery'} onChange={() => setShopType('gallery')} className="hidden" />
                                     Προϊόντα Γαλλερίας
                                 </label>
                             </div>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Όνομα Προϊόντος *</label>
                                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="π.χ. Πορτάκι Δρυς" />
                                </div>
                                {/* Company text field only for Wood — Gallery uses cat level 3 */}
                                {shopType === 'wood' && (
                                    <div className="w-full md:w-1/3 shrink-0">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Εταιρεία / Κατασκευαστής</label>
                                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="π.χ. Kastamonu" />
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Τιμή (€) *</label>
                                <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="0.00" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Κωδικός Προϊόντος (SKU)</label>
                                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="π.χ. PORT-DR-001" />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center"><LayoutGrid className="w-5 h-5 mr-2 text-green-600"/>Κατηγοριοποίηση</h2>
                            <div className={`grid gap-4 ${shopType === 'gallery' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                                {/* Level 1 — Main Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Κύρια Κατηγορία *</label>
                                    <select required name="mainCategoryId" value={formData.mainCategoryId} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-700">
                                        <option value="" disabled>Επιλογή κατηγορίας</option>
                                        {categories.filter(c => c.level === 1).map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Level 2 — Subcategory 1 (mandatory) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Υποκατηγορία *</label>
                                    <select required disabled={!formData.mainCategoryId} name="subCategoryId1" value={formData.subCategoryId1} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400">
                                        <option value="" disabled>Επιλογή υποκατηγορίας</option>
                                        {categories.filter(c => c.parentId === Number(formData.mainCategoryId) && c.level === 2).map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Level 3 — Company (Gallery only, optional) */}
                                {shopType === 'gallery' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Εταιρεία / Κατασκευαστής <span className="text-gray-400 font-normal">(Προαιρετικό)</span></label>
                                        <select disabled={!formData.subCategoryId1} name="subCategoryId2" value={formData.subCategoryId2} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400">
                                            <option value="">Καμία</option>
                                            {categories.filter(c => c.parentId === Number(formData.subCategoryId1) && c.level === 3).map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Η Κύρια Κατηγορία και η Υποκατηγορία είναι <strong>υποχρεωτικές</strong>{shopType === 'gallery' ? '. Η Εταιρεία είναι προαιρετική.' : '.'}</p>
                        </div>

                        {/* Details */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Περιγραφή *</label>
                            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="Αναλυτική περιγραφή υπεροχής του υλικού..."></textarea>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Χαρακτηριστικά (διαχωρίστε με κόμμα , )</label>
                            <input type="text" name="features" value={formData.features} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400" placeholder="π.χ. Αντοχή στην υγρασία, Mat υφή, Μήκος 2.80m" />
                        </div>

                        {/* Media Uploads */}
                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Βασική Εικόνα (Thumbnail) *</label>
                                <p className="text-sm text-gray-500 mb-4">Αυτή η εικόνα θα εμφανίζεται στην κεντρική λίστα (κατάλογος) και στην κορυφή του προϊόντος.<br/><span className="text-green-600 font-medium text-xs mt-1 block">Αυτόματη συμπίεση &lt; 500KB</span></p>
                                
                                <div className="flex items-center gap-6">
                                    {formData.image ? (
                                        <div className="relative group rounded-2xl overflow-hidden w-40 h-40 border border-gray-200 shrink-0">
                                            <img src={formData.image} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button type="button" onClick={() => setFormData(prev => ({...prev, image: ''}))} className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-green-50 hover:border-green-300 cursor-pointer transition-colors shrink-0">
                                            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500 font-medium">Ανέβασμα</span>
                                            <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" required />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6">
                                <label className="block text-sm font-bold text-gray-900 mb-2">Έξτρα Φωτογραφίες (Gallery)</label>
                                <p className="text-sm text-gray-500 mb-4">Προσθέστε επιπλέον λεπτομέρειες ή οπτικές γωνίες. Μπορείτε να επιλέξετε μέχρι <strong>4</strong> αρχεία.<br/><span className="text-green-600 font-medium text-xs mt-1 block">Αυτόματη συμπίεση &lt; 500KB</span></p>
                                
                                <div className="flex flex-wrap items-center gap-4">
                                    {formData.gallery.map((img, idx) => (
                                        <div key={idx} className="relative group rounded-xl overflow-hidden w-28 h-28 border border-gray-200">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 p-1 bg-white/90 text-red-600 rounded-full hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.gallery.length < 4 && (
                                        <label className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-green-50 hover:border-green-300 cursor-pointer transition-colors">
                                            <Plus className="w-6 h-6 text-gray-400 mb-1" />
                                            <span className="text-xs text-gray-500 font-medium">Προσθήκη</span>
                                            <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100 flex justify-end">
                            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-10 py-4 rounded-xl text-lg shadow-xl shadow-green-900/10">
                                {isSubmitting ? (
                                    <span className="flex items-center"><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Αποθήκευση...</span>
                                ) : 'Δημιουργία Προϊόντος'}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
