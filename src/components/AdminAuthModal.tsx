import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { useImageStore } from '../context/ImageStoreContext';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  const { verifyAndUnlockOwnerMode, isOwnerMode } = useImageStore();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMsg(null);
      setIsSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Silakan masukkan kata sandi pemilik');
      return;
    }

    const success = verifyAndUnlockOwnerMode(password.trim());
    if (success) {
      setIsSuccess(true);
      setErrorMsg(null);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setPassword('');
      }, 800);
    } else {
      setErrorMsg('Kata sandi salah! Coba periksa kembali.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 text-left overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">
              Mode Pemilik (Admin)
            </h3>
            <p className="text-xs text-[#86868b]">
              Masukkan password untuk mengaktifkan fitur edit &amp; atur foto
            </p>
          </div>
        </div>

        {/* Success state */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-semibold flex items-center gap-3 border border-emerald-200"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Autentikasi Berhasil! Mode Edit Aktif.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                Password Pemilik
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868b]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#f5f5f7] border border-black/10 focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] transition-all outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-xs text-rose-600 mt-2 font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-[#f5f5f7] hover:bg-black/5 text-[#1d1d1f] text-sm font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                Buka Kunci
              </button>
            </div>

            <div className="pt-2 text-center text-[11px] text-[#86868b] leading-tight">
              <span>Password default: </span>
              <code className="bg-black/5 px-1.5 py-0.5 rounded text-[#1d1d1f] font-mono font-bold">
                faliq2026
              </code>
              <div className="mt-1 text-[10px] text-[#86868b]">
                (Dapat Anda ganti sesuka hati kapan saja setelah login)
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
