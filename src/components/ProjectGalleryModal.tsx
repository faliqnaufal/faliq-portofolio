import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Tag,
  Building2,
  Calendar
} from 'lucide-react';
import { ProjectMediaItem } from '../types';
import { AdjustableImage } from './AdjustableImage';
import { useImageStore } from '../context/ImageStoreContext';

export interface GalleryModalData {
  title: string;
  subtitle?: string;
  category?: string;
  period?: string;
  items: ProjectMediaItem[];
  initialIndex?: number;
}

interface ProjectGalleryModalProps {
  galleryData: GalleryModalData | null;
  onClose: () => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({
  galleryData,
  onClose
}) => {
  const { getImageConfig } = useImageStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (galleryData) {
      setCurrentIndex(galleryData.initialIndex || 0);
    }
  }, [galleryData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryData) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % galleryData.items.length);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + galleryData.items.length) % galleryData.items.length);
      }
    };

    if (galleryData) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [galleryData, onClose]);

  if (!galleryData || galleryData.items.length === 0) return null;

  const currentItem = galleryData.items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryData.items.length) % galleryData.items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % galleryData.items.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#1d1d1f] border border-white/10 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.6)] overflow-hidden my-auto z-10 text-left text-white"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#1d1d1f]/90 sticky top-0 z-20 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white">
                <Sparkles className="w-4 h-4 text-[#0071e3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {galleryData.title}
                  </h3>
                  {galleryData.category && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#2997ff] text-[11px] font-semibold">
                      {galleryData.category}
                    </span>
                  )}
                </div>
                {galleryData.subtitle && (
                  <p className="text-xs text-[#86868b] line-clamp-1">
                    {galleryData.subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#86868b]">
                {currentIndex + 1} / {galleryData.items.length}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                aria-label="Close preview gallery"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Visual Display Area with Zoom and Reposition Support */}
          <div className="relative flex-1 bg-black/60 min-h-[320px] sm:min-h-[460px] max-h-[58vh] flex items-center justify-center p-4 overflow-hidden select-none">
            {/* Image */}
            <div className="max-h-[52vh] max-w-full w-full h-full flex items-center justify-center">
              <AdjustableImage
                id={currentItem.id || `modal-gallery-${galleryData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${currentIndex}`}
                defaultSrc={currentItem.image}
                alt={currentItem.title}
                label={`${galleryData.title} (${currentItem.title})`}
                objectFit="contain"
                containerClassName="max-h-[52vh] max-w-full w-auto flex items-center justify-center rounded-xl shadow-2xl overflow-hidden"
                className="max-h-[52vh] max-w-full w-auto object-contain rounded-xl"
              />
            </div>

            {/* Navigation Arrows */}
            {galleryData.items.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition cursor-pointer group shadow-lg hover:scale-105"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition cursor-pointer group shadow-lg hover:scale-105"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
                </button>
              </>
            )}
          </div>

          {/* Image Details & Caption Footer */}
          <div className="p-4 sm:p-6 bg-[#161617] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                {currentItem.tag && (
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0071e3]/20 border border-[#0071e3]/30 text-[#2997ff] text-[11px] font-bold uppercase tracking-wider">
                    {currentItem.tag}
                  </span>
                )}
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {currentItem.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
                {currentItem.caption}
              </p>
            </div>

            {/* Thumbnail Strip */}
            {galleryData.items.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full sm:max-w-xs pb-1 sm:pb-0 shrink-0">
                {galleryData.items.map((item, idx) => {
                  const itemConfig = getImageConfig(
                    item.id || `thumb-${idx}`,
                    item.image
                  );
                  const thumbSrc = itemConfig.url || item.image;
                  const thumbZoom = itemConfig.zoom ?? 1.0;
                  const thumbOffsetX = itemConfig.offsetX ?? 0;
                  const thumbOffsetY = itemConfig.offsetY ?? 0;

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                        currentIndex === idx
                          ? 'border-[#2997ff] scale-105 shadow-md'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={thumbSrc}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        style={{
                          transform: `scale(${thumbZoom}) translate(${thumbOffsetX}%, ${thumbOffsetY}%)`
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
