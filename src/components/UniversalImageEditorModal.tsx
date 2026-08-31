import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Upload,
  Move,
  Check,
  Camera,
  Link as LinkIcon,
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useImageStore } from '../context/ImageStoreContext';
import { compressImageFile } from '../utils/imageCompressor';

export const UniversalImageEditorModal: React.FC = () => {
  const { editorModalState, closeImageEditor, getImageConfig, updateImageConfig, resetImageConfig } = useImageStore();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1.0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editorModalState) {
      const config = getImageConfig(editorModalState.id, editorModalState.defaultUrl);
      setImageUrl(config.url || editorModalState.defaultUrl);
      setZoom(config.zoom || 1.0);
      setOffsetX(config.offsetX || 0);
      setOffsetY(config.offsetY || 0);
      setShowUrlInput(false);
      setCustomUrlInput('');
      setCompressionInfo(null);
    }
  }, [editorModalState]);

  if (!editorModalState || !editorModalState.isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2500);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Mohon unggah file format gambar (JPG, PNG, WebP)');
      return;
    }

    setIsProcessing(true);
    setCompressionInfo('Mengompresi & mengoptimalkan gambar...');

    try {
      const result = await compressImageFile(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.88,
        format: 'image/jpeg'
      });

      setImageUrl(result.dataUrl);
      setZoom(1.0);
      setOffsetX(0);
      setOffsetY(0);

      const origMb = (result.originalSize / (1024 * 1024)).toFixed(1);
      const compKb = (result.compressedSize / 1024).toFixed(0);
      setCompressionInfo(`Ukuran dioptimasi: ${origMb}MB → ${compKb}KB (Tersimpan aman & jernih)`);
      showToast('Foto berhasil dimuat & dioptimasi!');
    } catch (err) {
      console.error(err);
      showToast('Gagal memproses gambar');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (customUrlInput.trim()) {
      setImageUrl(customUrlInput.trim());
      setZoom(1.0);
      setOffsetX(0);
      setOffsetY(0);
      setShowUrlInput(false);
      setCompressionInfo('Menggunakan tautan URL eksternal');
      showToast('Link gambar berhasil dipasang!');
    }
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      await updateImageConfig(editorModalState.id, {
        url: imageUrl,
        zoom,
        offsetX,
        offsetY
      });
      showToast('Perubahan tersimpan permanen!');
      setTimeout(() => {
        closeImageEditor();
      }, 350);
    } catch (err) {
      console.error(err);
      showToast('Gagal menyimpan foto');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToDefault = async () => {
    await resetImageConfig(editorModalState.id);
    setImageUrl(editorModalState.defaultUrl);
    setZoom(1.0);
    setOffsetX(0);
    setOffsetY(0);
    setCompressionInfo(null);
    showToast('Foto dikembalikan ke setelan bawaan');
  };

  const handleResetZoomAndPan = () => {
    setZoom(1.0);
    setOffsetX(0);
    setOffsetY(0);
    showToast('Zoom dan posisi di-reset');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX * 2, y: e.clientY - offsetY * 2 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = (e.clientX - dragStart.x) / 2;
    const newY = (e.clientY - dragStart.y) / 2;
    setOffsetX(Math.max(-80, Math.min(80, newX)));
    setOffsetY(Math.max(-80, Math.min(80, newY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-60 px-4 py-2.5 rounded-2xl bg-[#1d1d1f] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/10"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-black/10 overflow-hidden flex flex-col my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-[#fbfbfd]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1d1d1f]">Ganti Foto &amp; Atur Zoom</h3>
                <span className="px-2 py-0.5 rounded-md bg-[#0071e3]/10 text-[#0071e3] text-[10px] font-bold">
                  Mode Pemilik
                </span>
              </div>
              <p className="text-[11px] text-[#86868b]">
                {editorModalState.label || 'Sesuaikan foto profil, portofolio, atau deliverable'}
              </p>
            </div>
          </div>
          <button
            onClick={closeImageEditor}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          {/* Interactive Live Preview Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#86868b]">
              <span>LIVE PREVIEW (GESER UNTUK REPOSITION)</span>
              <span className="text-[#0071e3] text-[11px]">Zoom: {Math.round(zoom * 100)}%</span>
            </div>

            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#e5e5ea] border-2 border-[#0071e3] shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
              title="Seret untuk mengubah posisi fokus foto"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-75"
                  style={{
                    transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
                  }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center text-center p-4 text-[#86868b]">
                  <Upload className="w-8 h-8 mb-2 text-[#0071e3]" />
                  <span className="text-xs font-bold text-[#1d1d1f]">Belum ada gambar</span>
                  <span className="text-[11px] text-[#86868b]">Tarik file foto atau klik tombol di bawah</span>
                </div>
              )}

              {/* Reposition Hint Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-xs font-bold bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                  <Move className="w-3.5 h-3.5" /> Klik &amp; Geser Foto (Pan X/Y)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Photo Replacement Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Upload className="w-4 h-4" />
              <span>Unggah Foto dari Komputer</span>
            </button>

            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-4 py-2.5 rounded-xl bg-[#f5f5f7] hover:bg-black/5 text-[#1d1d1f] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Gunakan Link URL</span>
            </button>

            <button
              onClick={handleResetToDefault}
              className="px-3 py-2.5 rounded-xl bg-black/[0.03] hover:bg-rose-50 hover:text-rose-600 text-[#86868b] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Kembalikan foto ke bawaan proyek"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Foto Asli</span>
            </button>
          </div>

            {/* Optional URL Input Panel */}
          {showUrlInput && (
            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] space-y-2">
              <label className="text-[11px] font-bold text-[#1d1d1f] block">
                Tempel URL / Tautan Gambar Langsung:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
                <button
                  onClick={handleApplyUrl}
                  className="px-4 py-2 rounded-xl bg-[#1d1d1f] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Terapkan
                </button>
              </div>
            </div>
          )}

          {/* Compression & Optimization Feedback Banner */}
          {compressionInfo && (
            <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-medium text-[11px]">{compressionInfo}</span>
            </div>
          )}

          {/* Zoom & Positioning Sliders */}
          <div className="space-y-4 pt-4 border-t border-black/[0.06]">
            {/* Zoom Slider & Quick Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#1d1d1f]">
                <span className="flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Zoom Level ({Math.round(zoom * 100)}%)</span>
                </span>
                
                {/* Quick Presets */}
                <div className="flex items-center gap-1">
                  {[0.8, 1.0, 1.25, 1.5, 2.0].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setZoom(preset)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                        Math.abs(zoom - preset) < 0.04
                          ? 'bg-[#0071e3] text-white'
                          : 'bg-black/[0.04] text-[#6e6e73] hover:bg-black/[0.08] hover:text-[#1d1d1f]'
                      }`}
                    >
                      {preset === 1.0 ? '1.0x (Fit)' : `${preset}x`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#86868b] font-medium">50%</span>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-[#0071e3] cursor-pointer"
                />
                <span className="text-[11px] text-[#86868b] font-medium">300%</span>
              </div>
            </div>

            {/* X and Y Pan Controls */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#1d1d1f]">
                  <span>Posisi Horizontal (X)</span>
                  <span className="text-[#86868b]">{Math.round(offsetX)}%</span>
                </div>
                <input
                  type="range"
                  min="-80"
                  max="80"
                  step="1"
                  value={offsetX}
                  onChange={(e) => setOffsetX(parseFloat(e.target.value))}
                  className="w-full accent-[#0071e3] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#1d1d1f]">
                  <span>Posisi Vertikal (Y)</span>
                  <span className="text-[#86868b]">{Math.round(offsetY)}%</span>
                </div>
                <input
                  type="range"
                  min="-80"
                  max="80"
                  step="1"
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseFloat(e.target.value))}
                  className="w-full accent-[#0071e3] cursor-pointer"
                />
              </div>
            </div>

            {/* Reset Zoom / Pan */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleResetZoomAndPan}
                className="text-[11px] font-semibold text-[#86868b] hover:text-[#0071e3] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Zoom &amp; Posisi ke Tengah</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#fbfbfd] border-t border-black/[0.06]">
          <span className="text-[11px] text-[#86868b] hidden sm:inline">
            Tersimpan otomatis dan hanya bisa diubah saat Mode Pemilik aktif.
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={closeImageEditor}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan &amp; Terapkan</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
