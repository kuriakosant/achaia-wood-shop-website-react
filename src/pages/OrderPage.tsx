import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud, CheckCircle2, Phone, FileSpreadsheet, Send,
  FileText, AlertTriangle, Loader2, Plus,
  X, ChevronsUpDown, Banknote, Mail, Table2
} from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import * as XLSX from 'xlsx';
import orderTemplate from '../assets/ORDER-DEFAULT.xlsx';

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrderRow {
  id: number;
  material: string;
  length: string;
  width: string;
  qty: string;
  pvcColor: string;
  pvcL1: string;
  pvcL2: string;
  pvcW1: string;
  pvcW2: string;
  notes: string;
}

const COLS = [
  { key: 'material', label: 'ΥΛΙΚΟ', width: 160, placeholder: 'ΛΕΥΚΗ 18MM' },
  { key: 'length',   label: 'ΜΗΚΟΣ (cm)', width: 90, placeholder: '121' },
  { key: 'width',    label: 'ΠΛΑΤΟΣ (cm)', width: 90, placeholder: '59' },
  { key: 'qty',      label: 'ΤΕΜΑΧΙΑ', width: 70, placeholder: '1' },
  { key: 'pvcColor', label: 'ΧΡΩΜΑ PVC', width: 110, placeholder: 'IDIO / OXI PVC' },
  { key: 'pvcL1',    label: 'ΜΗΚΟΣ 1 PVC', width: 90, placeholder: '2208 / κενό' },
  { key: 'pvcL2',    label: 'ΜΗΚΟΣ 2 PVC', width: 90, placeholder: '2208 / κενό' },
  { key: 'pvcW1',    label: 'ΠΛΑΤΟΣ 1 PVC', width: 90, placeholder: '2208 / κενό' },
  { key: 'pvcW2',    label: 'ΠΛΑΤΟΣ 2 PVC', width: 90, placeholder: '2208 / κενό' },
  { key: 'notes',    label: 'ΠΑΡΑΤΗΡΗΣΕΙΣ', width: 160, placeholder: 'Προαιρετικό' },
] as const;

type ColKey = typeof COLS[number]['key'];

const emptyRow = (id: number): OrderRow => ({
  id, material: '', length: '', width: '', qty: '1',
  pvcColor: '', pvcL1: '', pvcL2: '', pvcW1: '', pvcW2: '', notes: '',
});

// ─── Component ───────────────────────────────────────────────────────────────

const OrderPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess]           = useState(false);
  const [error, setError]               = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    paymentMethod: 'Μετρητά',
    documentType: 'Απόδειξη',
    specialInstructions: '',
  });

  // ── File upload ──
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileName, setFileName]     = useState<string>('');

  // ── Mini Excel editor ──
  const [showEditor, setShowEditor]   = useState(true);
  const [nextId, setNextId]           = useState(4);
  const [rows, setRows]               = useState<OrderRow[]>([
    emptyRow(1), emptyRow(2), emptyRow(3),
  ]);

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => setFileBase64(reader.result as string);
      reader.readAsDataURL(file);
      // Hide editor when a manual file is uploaded
      setShowEditor(false);
    }
  };

  const addRow = () => {
    setRows(prev => [...prev, emptyRow(nextId)]);
    setNextId(n => n + 1);
  };

  const removeRow = (id: number) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const updateCell = useCallback((id: number, key: ColKey, value: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [key]: value } : r));
  }, []);

  /** Same but as base64 data URL for sending to backend */
  const buildExcelBase64 = (): string => {
    const header = COLS.map(c => c.label);
    const data   = rows.map(r => COLS.map(c => (r as any)[c.key]));
    const ws     = XLSX.utils.aoa_to_sheet([header, ...data]);
    ws['!cols']  = COLS.map(c => ({ wch: Math.round(c.width / 7) }));
    const wb     = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Παραγγελία');
    const b64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${b64}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // If editor is active and no manual file, generate excel from editor rows
    let finalFileUrl = fileBase64;
    if (showEditor && !fileBase64) {
      const hasRows = rows.some(r => r.material.trim() || r.length.trim());
      if (!hasRows) {
        setError('Παρακαλώ συμπληρώστε τουλάχιστον μία γραμμή στον πίνακα παραγγελίας ή ανεβάστε αρχείο.');
        setIsSubmitting(false);
        return;
      }
      finalFileUrl  = buildExcelBase64();
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/orders`, {
        ...formData,
        fileUrl: finalFileUrl,
      });
      setSuccess(true);
      setFormData({ customerName: '', phone: '', paymentMethod: 'Μετρητά', documentType: 'Απόδειξη', specialInstructions: '' });
      setFileBase64('');
      setFileName('');
      setRows([emptyRow(1), emptyRow(2), emptyRow(3)]);
      setNextId(4);
      setShowEditor(true);
    } catch {
      setError('Παρουσιάστηκε σφάλμα κατά την αποστολή της παραγγελίας. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-screen-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Υπηρεσιες</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Στείλτε την Παραγγελία σας</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Για την ταχύτερη και πιο αξιόπιστη εξυπηρέτησή σας, παρακαλούμε χρησιμοποιήστε τον ηλεκτρονικό πίνακα παραγγελίας ή ανεβάστε το δικό σας αρχείο.
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-10">

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full xl:w-80 shrink-0 space-y-6"
          >
            {/* Download Template */}
            <div className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-28 h-28 bg-green-50 rounded-bl-full -mr-14 -mt-14 transition-transform group-hover:scale-110" />
              <h2 className="text-lg font-bold text-gray-900 mb-3 relative z-10 flex items-center">
                <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600" /> Κατεβάστε το Πρότυπο
              </h2>
              <p className="text-gray-500 text-sm mb-4 relative z-10">
                Κατεβάστε το πρότυπο μας, συμπληρώστε το και ανεβάστε το στη φόρμα.
              </p>
              <a href={orderTemplate} download="ΠΡΟΤΥΠΟ_ΠΑΡΑΓΓΕΛΙΑΣ.xlsx">
                <Button className="w-full justify-center text-sm py-2.5">Λήψη Excel Προτύπου</Button>
              </a>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" /> Οδηγίες Συμπλήρωσης
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" /><span><strong>Διαστάσεις:</strong> Μήκος × Πλάτος σε cm χωρίς μονάδες (π.χ. 121 / 59).</span></li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" /><span><strong>PVC 1 πλευρά:</strong> Γράψτε 2208 σε ΜΗΚΟΣ_1 ή ΠΛΑΤΟΣ_1 (αντίστοιχα).</span></li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" /><span><strong>PVC 2 πλευρές:</strong> Γράψτε 2208 και σε _1 και _2 της ίδιας διάστασης.</span></li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" /><span><strong>PVC γύρω-γύρω:</strong> Βάλτε 2208 και στα 4 πεδία PVC.</span></li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" /><span><strong>Χρώμα PVC:</strong> Κωδικός χρώματος ή IDIO / OXI PVC.</span></li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" /><span><strong>Υλικό:</strong> π.χ. ΛΕΥΚΗ 18MM — ποτέ κενό!</span></li>
              </ul>
            </div>

            {/* Phone contact */}
            <div className="bg-gray-100 rounded-3xl p-7 border border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-700" /> Τηλεφωνική Παραγγελία
              </h3>
              <p className="text-gray-600 text-sm mb-3">Δυσκολεύεστε με τη φόρμα; Καλέστε μας!</p>
              <div className="font-bold text-gray-900 tracking-wider text-sm">
                2610 434377 <span className="font-normal text-gray-400">|</span> 2610 434478
              </div>
            </div>

            {/* Bank deposit info */}
            <div className="bg-amber-50 rounded-3xl p-7 border border-amber-200 shadow-sm">
              <h3 className="text-base font-bold text-amber-900 mb-3 flex items-center">
                <Banknote className="w-4 h-4 mr-2 text-amber-600" /> Τραπεζική Κατάθεση
              </h3>
              <p className="text-amber-800 text-sm leading-relaxed mb-4">
                Για πληρωμή μέσω τραπεζικής κατάθεσης, επικοινωνήστε μαζί μας ώστε να σας δώσουμε τους{' '}
                <strong>Λογαριασμούς Όψεως Εταιρείας</strong>.
              </p>
              <div className="space-y-2 text-sm">
                <a href="mailto:antoniadis_oe@yahoo.gr" className="flex items-center text-amber-700 hover:text-amber-900 font-medium transition-colors">
                  <Mail className="w-4 h-4 mr-2" /> antoniadis_oe@yahoo.gr
                </a>
                <div className="flex items-center text-amber-800 font-medium">
                  <Phone className="w-4 h-4 mr-2" /> 2610 434377
                </div>
              </div>
            </div>

          </motion.div>

          {/* ── Main Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1 min-w-0"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl shadow-green-900/5">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Φόρμα Παραγγελίας</h2>

              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Η παραγγελία εστάλη επιτυχώς!</h3>
                  <p className="text-green-700">Θα την επεξεργαστούμε άμεσα και θα επικοινωνήσουμε μαζί σας αν χρειαστεί.</p>
                  <Button onClick={() => setSuccess(false)} className="mt-8 mx-auto w-fit px-8 py-3 rounded-full text-base font-bold shadow-sm">Νέα Παραγγελία</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">{error}</div>
                  )}

                  {/* ── Customer Info ── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ονοματεπώνυμο ή Εταιρεία *</label>
                      <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400"
                        placeholder="Εισάγετε όνομα" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Τηλέφωνο Επικοινωνίας *</label>
                      <input required type="text" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400"
                        placeholder="Τηλέφωνο" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Τρόπος Πληρωμής *</label>
                      <select required name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all text-gray-700">
                        <option value="Μετρητά">Μετρητά (στο κατάστημα)</option>
                        <option value="Κάρτα POS">Κάρτα (POS στο κατάστημα)</option>
                        <option value="Τραπεζική Κατάθεση">Τραπεζική Κατάθεση</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Παραστατικό *</label>
                      <select required name="documentType" value={formData.documentType} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all text-gray-700">
                        <option value="Απόδειξη">Απόδειξη Λιανικής</option>
                        <option value="Τιμολόγιο">Τιμολόγιο</option>
                      </select>
                    </div>
                  </div>

                  {/* ── Mini Excel Editor ── */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Table2 className="w-4 h-4 text-green-600" />
                        Πίνακας Παραγγελίας
                        <span className="text-xs text-gray-400 font-normal">(προτεινόμενο)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowEditor(v => !v)}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-700 bg-gray-100 hover:bg-green-50 border border-gray-200 hover:border-green-200 px-3 py-1.5 rounded-lg transition-all font-medium"
                      >
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                        {showEditor ? 'Απόκρυψη πίνακα' : 'Εμφάνιση πίνακα'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showEditor && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-2 border-green-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                            {/* Scrollable table */}
                            <div className="overflow-x-auto">
                              <table className="min-w-full text-xs">
                                <thead>
                                  <tr className="bg-gray-900 text-white">
                                    <th className="px-2 py-2.5 text-left font-semibold w-8">#</th>
                                    {COLS.map(c => (
                                      <th key={c.key} className="px-2 py-2.5 text-left font-semibold whitespace-nowrap" style={{ minWidth: c.width }}>
                                        {c.label}
                                      </th>
                                    ))}
                                    <th className="px-2 py-2.5 w-8" />
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {rows.map((row, idx) => (
                                    <tr key={row.id} className="group hover:bg-green-50/40 transition-colors">
                                      <td className="px-2 py-1.5 text-gray-400 font-mono">{idx + 1}</td>
                                      {COLS.map(c => (
                                        <td key={c.key} className="px-1 py-1">
                                          <input
                                            type="text"
                                            value={(row as any)[c.key]}
                                            onChange={e => updateCell(row.id, c.key as ColKey, e.target.value)}
                                            placeholder={c.placeholder}
                                            className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent hover:border-gray-200 focus:border-green-400 focus:bg-white focus:ring-1 focus:ring-green-400/40 outline-none transition-all placeholder-gray-300 text-gray-800"
                                            style={{ minWidth: c.width - 12 }}
                                          />
                                        </td>
                                      ))}
                                      <td className="px-2 py-1 text-center">
                                        <button
                                          type="button"
                                          onClick={() => removeRow(row.id)}
                                          disabled={rows.length === 1}
                                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:pointer-events-none"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Table footer */}
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={addRow}
                                className="flex items-center gap-1.5 text-xs text-green-700 hover:text-green-900 font-semibold bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-all"
                              >
                                <Plus className="w-3.5 h-3.5" /> Νέα Γραμμή
                              </button>
                              <span className="text-xs text-gray-400">{rows.length} γραμμές</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Or upload a file ── */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ή ανεβάστε αρχείο (Excel, Φωτογραφία, Σκίτσο)
                    </label>
                    <div className="relative flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-green-50 hover:border-green-300 transition-colors cursor-pointer group">
                      <div className="text-center">
                        {fileName ? (
                          <div className="flex flex-col items-center">
                            <FileText className="mx-auto h-10 w-10 text-green-500 mb-2" />
                            <span className="text-gray-900 font-medium text-sm">{fileName}</span>
                            <button type="button" onClick={() => { setFileBase64(''); setFileName(''); setShowEditor(true); }}
                              className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                              <X className="w-3 h-3" /> Αφαίρεση
                            </button>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-green-500 transition-colors" />
                            <p className="mt-2 text-sm text-gray-500">
                              <span className="font-medium text-green-600">Αναζήτηση αρχείου</span> ή σύρτε εδώ
                            </p>
                            <p className="text-xs text-gray-400 mt-1">.xlsx · .pdf · .png · .jpg (Μέγ. 5MB)</p>
                          </>
                        )}
                      </div>
                      <input id="file-upload" type="file" accept=".xlsx,.pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                    {fileName && (
                      <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Ο πίνακας απενεργοποιήθηκε — το ανεβασμένο αρχείο θα σταλεί.
                      </p>
                    )}
                  </div>

                  {/* ── Notes ── */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ιδιαίτερες Οδηγίες / Συμπληρωματικά</label>
                    <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-gray-400 text-sm"
                      placeholder="Γράψτε εδώ τυχόν διευκρινίσεις ή οδηγίες για εμάς..." />
                  </div>

                  {/* ── Submit ── */}
                  <div className="pt-4 border-t border-gray-100">
                    <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-lg justify-center shadow-lg shadow-green-900/10 rounded-xl">
                      {isSubmitting
                        ? <span className="flex items-center"><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Αποστολή...</span>
                        : <span className="flex items-center"><Send className="w-5 h-5 mr-3" /> Καταχώρηση Παραγγελίας</span>
                      }
                    </Button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default OrderPage;
