import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Camera,
  Download,
  Upload,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Database,
  FileJson,
  AlertCircle
} from 'lucide-react';
import { useImageStore } from '../context/ImageStoreContext';

export const OwnerToolbar: React.FC = () => {
  const {
    isOwnerMode,
    lockOwnerMode,
    changeOwnerPassword,
    images,
    resetAllImages,
    exportConfigJson,
    importConfigJson,
    isStorageReady
  } = useImageStore();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState<boolean>(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState(false);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  // If not logged in / not in owner mode, HIDE toolbar completely from public
  if (!isOwnerMode) {
    return null;
  }

  const imageConfigCount = Object.keys(images).length;

  const handleCopyJson = () => {
    const jsonStr = exportConfigJson();
    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJsonFile = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faliq-portfolio-photos-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUploadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = await importConfigJson(content);
          if (success) {
            setImportStatus('Berhasil mengimpor dan menerapkan semua foto dari file!');
            setTimeout(() => {
              setImportStatus(null);
              setShowJsonModal(false);
            }, 1800);
          } else {
            setImportStatus('File JSON tidak valid!');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportText = async () => {
    if (!jsonInput.trim()) return;
    const success = await importConfigJson(jsonInput.trim());
    if (success) {
      setImportStatus('Berhasil mengimpor konfigurasi foto!');
      setTimeout(() => {
        setImportStatus(null);
        setShowJsonModal(false);
        setJsonInput('');
      }, 1500);
    } else {
      setImportStatus('Format JSON tidak valid!');
    }
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass.trim()) {
      setPassMsg('Password baru tidak boleh kosong');
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg('Konfirmasi password tidak cocok');
      return;
    }
    changeOwnerPassword(newPass.trim());
    setPassSuccess(true);
    setPassMsg(null);
    setTimeout(() => {
      setShowPasswordChangeModal(false);
      setPassSuccess(false);
      setNewPass('');
      setConfirmPass('');
    }, 1200);
  };

  return (
    <>
      {/* Floating Bottom Controller for Verified Owner */}
      <aside aria-label="Kontrol Manajemen Foto Pemilik" className="fixed bottom-5 right-5 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.2)] overflow-hidden text-left"
        >
          {/* Main Status Pill */}
          <div className="p-2 sm:p-2.5 flex items-center gap-2">
            {/* Lock / Leave Admin Mode Button */}
            <button
              onClick={lockOwnerMode}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-xs"
              title="Kunci Website & Keluar ke Mode Publik"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kunci (Mode Publik)</span>
            </button>

            {/* Expand / Minimize Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-xl hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
              title="Menu Pengaturan Tambahan"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Tools Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-3.5 pb-3.5 pt-1 border-t border-black/[0.06] space-y-3 max-w-[290px] sm:max-w-[330px]"
              >
                <div className="text-[11px] text-[#86868b] leading-relaxed">
                  <div className="space-y-1">
                    <span className="font-bold text-[#1d1d1f] flex items-center gap-1">
                      <Camera className="w-3 h-3 text-[#0071e3]" /> Mode Edit Foto Aktif
                    </span>
                    <p>
                      Arahkan kursor ke foto (avatar, proyek, sertifikat) lalu klik tombol <strong>"Ganti &amp; Zoom"</strong>.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg mt-1 font-medium">
                      <Database className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Edit draft tersimpan di browser</span>
                    </div>
                  </div>
                </div>

                {imageConfigCount > 0 && (
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#0071e3] bg-[#0071e3]/10 px-2.5 py-1 rounded-lg">
                    <span>{imageConfigCount} Konfigurasi Foto Aktif</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => setShowJsonModal(true)}
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileJson className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Backup / Ekspor Data Foto</span>
                    </span>
                    <span className="text-[10px] text-[#86868b]">JSON</span>
                  </button>

                  <button
                    onClick={() => setShowPasswordChangeModal(true)}
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#86868b]" />
                    <span>Ganti Password Pemilik</span>
                  </button>

                  {imageConfigCount > 0 && (
                    <button
                      onClick={async () => {
                        if (window.confirm('Yakin ingin mereset semua foto ke pengaturan awal bawaan?')) {
                          await resetAllImages();
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-xl hover:bg-rose-50 text-rose-600 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Semua Foto ke Bawaan</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </aside>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordChangeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-black/10 p-6 space-y-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#0071e3]" />
                  <h3 className="text-sm font-bold text-[#1d1d1f]">Ganti Password Pemilik</h3>
                </div>
                <button
                  onClick={() => setShowPasswordChangeModal(false)}
                  className="text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {passSuccess ? (
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Password berhasil diperbarui!</span>
                </div>
              ) : (
                <form onSubmit={handleSavePassword} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                      Password Baru:
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Masukkan password baru..."
                      className="w-full px-3 py-2 rounded-xl bg-[#f5f5f7] border border-black/10 text-xs text-[#1d1d1f] outline-hidden focus:border-[#0071e3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                      Ulangi Password Baru:
                    </label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Ulangi password baru..."
                      className="w-full px-3 py-2 rounded-xl bg-[#f5f5f7] border border-black/10 text-xs text-[#1d1d1f] outline-hidden focus:border-[#0071e3]"
                    />
                  </div>

                  {passMsg && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{passMsg}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordChangeModal(false)}
                      className="flex-1 py-2 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-[#0071e3] text-white text-xs font-semibold shadow-xs cursor-pointer hover:bg-[#0077ed]"
                    >
                      Simpan Password
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* JSON Backup & Import Modal */}
      <AnimatePresence>
        {showJsonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-black/10 p-6 space-y-4 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-[#0071e3]" />
                  <h3 className="text-sm font-bold text-[#1d1d1f]">Backup &amp; Ekspor / Impor Data Foto</h3>
                </div>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <input
                ref={fileUploadRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileUploadJson}
              />

              <div className="space-y-3">
                <p className="text-xs text-[#6e6e73]">
                  Konfigurasi publik utama berasal dari JSON yang ikut di-deploy. Edit di panel ini menjadi draft browser sampai Anda ekspor JSON dan deploy ulang:
                </p>

                {/* Quick File Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleDownloadJsonFile}
                    className="px-3 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-98"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File JSON</span>
                  </button>

                  <button
                    onClick={() => fileUploadRef.current?.click()}
                    className="px-3 py-2.5 rounded-xl bg-[#f5f5f7] hover:bg-black/5 text-[#1d1d1f] text-xs font-semibold flex items-center justify-center gap-1.5 border border-black/10 cursor-pointer transition-all"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Unggah File JSON</span>
                  </button>
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-[#1d1d1f] block mb-1">
                    Atau Salin / Tempel Teks JSON Langsung:
                  </label>
                  <textarea
                    value={jsonInput || exportConfigJson()}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Tempel konfigurasi JSON di sini untuk mengimpor..."
                    className="w-full h-32 p-3 rounded-xl bg-[#f5f5f7] font-mono text-[11px] text-[#1d1d1f] border border-black/10 resize-none focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                {importStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{importStatus}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
                <button
                  onClick={handleCopyJson}
                  className="px-4 py-2 rounded-xl bg-[#f5f5f7] hover:bg-black/5 text-[#1d1d1f] text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-black/5"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Tersalin ke Clipboard!' : 'Salin Teks JSON'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {jsonInput.trim() && (
                    <button
                      onClick={handleImportText}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Terapkan Teks JSON
                    </button>
                  )}
                  <button
                    onClick={() => setShowJsonModal(false)}
                    className="px-4 py-2 rounded-xl bg-black/[0.04] text-[#1d1d1f] text-xs font-semibold hover:bg-black/[0.08] cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OwnerToolbar;
