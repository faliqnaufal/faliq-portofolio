import React, { useState, useRef, useEffect } from 'react';
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
  Maximize2
} from 'lucide-react';

export interface AvatarConfig {
  imageUrl: string;
  zoom: number; // 1 to 3
  offsetX: number; // in percentage (-50% to +50%)
  offsetY: number; // in percentage (-50% to +50%)
}

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: AvatarConfig | null;
  onSaveConfig: (config: AvatarConfig | null) => void;
}

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSaveConfig
}) => {
  const [imageUrl, setImageUrl] = useState<string>(
    currentConfig?.imageUrl || ''
  );
  const [zoom, setZoom] = useState<number>(currentConfig?.zoom || 1.0);
  const [offsetX, setOffsetX] = useState<number>(currentConfig?.offsetX || 0);
  const [offsetY, setOffsetY] = useState<number>(currentConfig?.offsetY || 0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setImageUrl(currentConfig?.imageUrl || '');
      setZoom(currentConfig?.zoom || 1.0);
      setOffsetX(currentConfig?.offsetX || 0);
      setOffsetY(currentConfig?.offsetY || 0);
    }
  }, [isOpen, currentConfig]);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageUrl(result);
        setZoom(1.0);
        setOffsetX(0);
        setOffsetY(0);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!imageUrl) {
      onSaveConfig(null);
    } else {
      onSaveConfig({
        imageUrl,
        zoom,
        offsetX,
        offsetY
      });
    }
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    setZoom(1.0);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleClearPhoto = () => {
    setImageUrl('');
    setZoom(1.0);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageUrl) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX * 2, y: e.clientY - offsetY * 2 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = (e.clientX - dragStart.x) / 2;
    const newY = (e.clientY - dragStart.y) / 2;
    // Bound offsets to reasonable percentages
    setOffsetX(Math.max(-80, Math.min(80, newX)));
    setOffsetY(Math.max(-80, Math.min(80, newY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-black/10 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-[#fbfbfd]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1d1d1f]">Atur Foto &amp; Zoom Avatar</h3>
              <p className="text-[11px] text-[#86868b]">Sesuaikan skala (zoom in/out) &amp; posisi foto profil navbar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
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

          {/* Interactive Preview Canvas */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
              Live Preview
            </div>

            <div className="flex items-center justify-center gap-6 p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] w-full">
              {/* Big Preview with Drag Position */}
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative w-32 h-32 rounded-2xl overflow-hidden bg-white border-2 border-[#0071e3] shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
                title="Klik dan seret untuk menggeser posisi foto"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview Avatar"
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-75"
                    style={{
                      transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center text-center p-3 text-[#86868b]">
                    <Upload className="w-6 h-6 mb-1 text-[#0071e3]" />
                    <span className="text-[10px] font-medium">Belum ada foto</span>
                  </div>
                )}

                {imageUrl && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Move className="w-2.5 h-2.5" /> Geser
                    </span>
                  </div>
                )}
              </div>

              {/* Mini Previews (Navbar replica) */}
              <div className="flex flex-col gap-3 text-left">
                <div>
                  <span className="text-[10px] font-bold text-[#86868b] block mb-1">Tampilan di Navbar:</span>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-black/5 shadow-xs">
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-[#1d1d1f] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Navbar avatar"
                          className="w-full h-full object-cover"
                          style={{
                            transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
                          }}
                        />
                      ) : (
                        <span>FN</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1d1d1f]">Faliq Nauval</div>
                      <div className="text-[9px] text-[#86868b]">Digital Marketer</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{imageUrl ? 'Ganti Foto' : 'Unggah Foto'}</span>
                  </button>
                  {imageUrl && (
                    <button
                      onClick={handleClearPhoto}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Zoom & Positioning Controls */}
          {imageUrl && (
            <div className="space-y-4 pt-2 border-t border-black/[0.06]">
              {/* Zoom Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1d1d1f]">
                  <span className="flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Zoom In / Out ({Math.round(zoom * 100)}%)</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.1).toFixed(2))))}
                      className="p-1 rounded-md hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f]"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.1).toFixed(2))))}
                      className="p-1 rounded-md hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f]"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#86868b] font-medium">60%</span>
                  <input
                    type="range"
                    min="0.6"
                    max="3.0"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-[#0071e3] cursor-pointer"
                  />
                  <span className="text-[11px] text-[#86868b] font-medium">300%</span>
                </div>
              </div>

              {/* Offset Sliders (X and Y) */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#1d1d1f]">
                    <span>Posisi Horizontal (X)</span>
                    <span className="text-[#86868b]">{Math.round(offsetX)}%</span>
                  </div>
                  <input
                    type="range"
                    min="-60"
                    max="60"
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
                    min="-60"
                    max="60"
                    step="1"
                    value={offsetY}
                    onChange={(e) => setOffsetY(parseFloat(e.target.value))}
                    className="w-full accent-[#0071e3] cursor-pointer"
                  />
                </div>
              </div>

              {/* Reset to Default */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleReset}
                  className="text-[11px] font-semibold text-[#86868b] hover:text-[#0071e3] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Zoom &amp; Posisi</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#fbfbfd] border-t border-black/[0.06]">
          <span className="text-[11px] text-[#86868b]">
            Perubahan akan otomatis diterapkan ke seluruh tampilan avatar
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {savedToast ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{savedToast ? 'Tersimpan!' : 'Terapkan & Simpan'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
