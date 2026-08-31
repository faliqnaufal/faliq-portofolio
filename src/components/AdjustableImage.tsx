import React, { useState, useEffect } from 'react';
import { Camera, ImageOff } from 'lucide-react';
import { useImageStore } from '../context/ImageStoreContext';

interface AdjustableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  onClick?: () => void;
  showEditOverlay?: boolean;
}

const GLOBAL_SAFE_FALLBACK = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop';

export const AdjustableImage: React.FC<AdjustableImageProps> = ({
  id,
  defaultSrc,
  alt,
  label = 'Foto',
  className = '',
  containerClassName = '',
  aspectRatio = '',
  objectFit = 'cover',
  onClick,
  showEditOverlay = true
}) => {
  const { isOwnerMode, getImageConfig, openImageEditor } = useImageStore();
  const [fallbackLevel, setFallbackLevel] = useState<number>(0);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const config = getImageConfig(id, defaultSrc);
  const activeSrc = config.url || defaultSrc;
  const zoom = config.zoom ?? 1.0;
  const offsetX = config.offsetX ?? 0;
  const offsetY = config.offsetY ?? 0;

  // Reset error states when source or ID changes
  useEffect(() => {
    setFallbackLevel(0);
    setLoadFailed(false);
  }, [activeSrc, id, defaultSrc]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openImageEditor(id, defaultSrc, label);
  };

  const handleImageError = () => {
    if (fallbackLevel === 0 && activeSrc !== defaultSrc && defaultSrc) {
      // Fallback to defaultSrc if active custom url failed
      setFallbackLevel(1);
    } else if (fallbackLevel < 2) {
      // Fallback to global safe verified asset
      setFallbackLevel(2);
    } else {
      // Render fallback placeholder UI
      setLoadFailed(true);
    }
  };

  const displaySrc = fallbackLevel === 0 
    ? activeSrc 
    : fallbackLevel === 1 
      ? defaultSrc 
      : GLOBAL_SAFE_FALLBACK;

  return (
    <div
      className={`relative overflow-hidden group ${aspectRatio} ${containerClassName}`}
      onClick={onClick}
    >
      {/* Image with zoom and position transforms or styled placeholder */}
      {!loadFailed ? (
        <img
          src={displaySrc}
          alt={alt}
          onError={handleImageError}
          className={`w-full h-full object-${objectFit} transition-transform duration-200 ${className}`}
          style={{
            transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
          }}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f5f7] text-[#86868b] p-4 text-center">
          <ImageOff className="w-6 h-6 mb-1 text-[#86868b]" />
          <span className="text-[10px] font-medium">{label || 'Foto tidak dapat dimuat'}</span>
        </div>
      )}

      {/* Owner Mode Edit Trigger (ONLY rendered when Owner Mode is enabled) */}
      {isOwnerMode && showEditOverlay && (
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
          <button
            onClick={handleEditClick}
            className="px-2.5 py-1.5 rounded-xl bg-black/75 hover:bg-[#0071e3] text-white text-[10px] font-bold backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title={`Ganti atau atur Zoom foto (${label})`}
            aria-label={`Edit foto ${label}`}
          >
            <Camera className="w-3 h-3 text-white" />
            <span className="hidden sm:inline">Ganti &amp; Zoom</span>
          </button>
        </div>
      )}
    </div>
  );
};
