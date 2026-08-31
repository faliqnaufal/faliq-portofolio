import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  FileDown,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Briefcase,
  MapPin,
  CheckCircle2,
  Linkedin,
  Instagram,
  Camera,
  RotateCcw,
  Check,
  Sliders
} from 'lucide-react';
import { PROFILE_DATA, QUICK_STATS } from '../data/portfolioData';
import { useImageStore } from '../context/ImageStoreContext';

interface HeroSectionProps {
  onOpenCVModal: () => void;
}

const DEFAULT_HERO_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCVModal }) => {
  const { isOwnerMode, getImageConfig, openImageEditor, updateImageConfig, resetImageConfig, compressAndSetImage } = useImageStore();
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroImageConfig = getImageConfig('hero-profile-avatar', DEFAULT_HERO_AVATAR);
  const avatarUrl = heroImageConfig.url;
  const zoom = heroImageConfig.zoom ?? 1.0;
  const offsetX = heroImageConfig.offsetX ?? 0;
  const offsetY = heroImageConfig.offsetY ?? 0;

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Mohon unggah file format gambar (JPG/PNG/WEBP)');
      return;
    }

    try {
      showToast('Mengompresi & menyimpan foto...');
      await compressAndSetImage('hero-profile-avatar', file, 1.0, 0, 0);
      showToast('Foto profil berhasil diperbarui & disimpan permanen!');
    } catch (err) {
      console.error(err);
      showToast('Gagal memproses foto');
    }
  };

  const showToast = (msg: string) => {
    setUploadToast(msg);
    setTimeout(() => {
      setUploadToast(null);
    }, 3500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isOwnerMode) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetImageConfig('hero-profile-avatar');
    showToast('Foto dikembalikan ke default');
  };

  const handleOpenPhotoEditor = () => {
    if (isOwnerMode) {
      openImageEditor('hero-profile-avatar', DEFAULT_HERO_AVATAR, 'Foto Profil Hero Utama');
    }
  };

  return (
    <section id="home" className="relative min-h-[88vh] pt-28 sm:pt-36 pb-20 flex flex-col justify-center overflow-hidden bg-[#f5f5f7]">
      
      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />

      {/* Floating Upload Notification */}
      <AnimatePresence>
        {uploadToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-2xl bg-[#1d1d1f] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/10"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{uploadToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Apple Subtle Ambient Light Diffusion */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-blue-400/10 via-indigo-300/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-400/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Clean & Confident Apple Typography (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill in Apple Glassmorphism */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/[0.06] text-xs font-semibold text-[#1d1d1f] backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Roles &amp; High-Impact Strategic Projects</span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#6e6e73] uppercase">
                <span>{PROFILE_DATA.name}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.1]">
                Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] via-[#4338ca] to-[#6366f1]">Business Strategy</span> &amp; Digital Growth.
              </h1>
            </div>

            {/* Refined Subtitle Description */}
            <p className="text-base sm:text-lg text-[#424245] leading-relaxed max-w-2xl font-normal">
              {PROFILE_DATA.summary}
            </p>

            {/* Key Skill Highlights Pill Group */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-white/90 border border-black/[0.06] text-xs font-medium text-[#1d1d1f] shadow-xs flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#0071e3]" />
                Digital Marketing
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 border border-black/[0.06] text-xs font-medium text-[#1d1d1f] shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Social Media Handling / Specialist
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 border border-black/[0.06] text-xs font-medium text-[#1d1d1f] shadow-xs flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Brand Strategy &amp; Growth
              </span>
            </div>

            {/* Apple Action Buttons & Socials */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-explore-work-btn"
                onClick={scrollToWork}
                className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold transition-all hover:shadow-md active:scale-98 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>View Case Studies</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-download-cv-btn"
                onClick={onOpenCVModal}
                className="px-5 py-3 rounded-full bg-white/90 hover:bg-white text-[#1d1d1f] border border-black/[0.08] hover:border-black/[0.15] text-sm font-semibold transition-all hover:shadow-sm active:scale-98 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <FileDown className="w-4 h-4 text-[#0071e3]" />
                <span>Resume (PDF)</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={PROFILE_DATA.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] border border-black/[0.06] text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Instagram & LinkedIn Quick Link Pills */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={PROFILE_DATA.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white border border-black/[0.06] text-[#1d1d1f] hover:text-pink-600 transition shadow-xs"
                  title="Instagram @faliqnaufal_"
                  aria-label="Instagram profile"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                </a>

                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white border border-black/[0.06] text-[#1d1d1f] hover:text-[#0071e3] transition shadow-xs"
                  title="LinkedIn profile"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4 text-[#0071e3]" />
                </a>
              </div>
            </div>

            {/* Location & Ready Marker */}
            <div className="flex items-center gap-4 text-xs text-[#6e6e73] pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{PROFILE_DATA.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Open for Remote &amp; On-Site</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Clean Portrait Photo & Live Upload (Col 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Direct Photo Frame with Live Zoom, Pan, and Owner-Only Controls */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                if (isOwnerMode) setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onMouseEnter={() => isOwnerMode && setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              onClick={handleOpenPhotoEditor}
              className={`relative w-full max-w-md aspect-[4/4.8] rounded-3xl overflow-hidden bg-gradient-to-b from-[#e8e8ed] to-[#d8d8de] transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.08)] group ${
                isOwnerMode ? 'cursor-pointer' : 'cursor-default'
              } ${
                isDragging ? 'ring-4 ring-[#0071e3]/40 scale-[1.02]' : ''
              }`}
              title={isOwnerMode ? "Klik untuk mengganti foto profil & atur zoom" : PROFILE_DATA.name}
            >
              <img
                src={avatarUrl}
                alt={PROFILE_DATA.name}
                className="w-full h-full object-cover transition-transform duration-150"
                style={{
                  transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
                }}
                referrerPolicy="no-referrer"
              />

              {/* Owner Mode Quick Controls Pill & Overlay */}
              {isOwnerMode && (
                <div
                  className={`absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white transition-opacity duration-200 p-4 text-center ${
                    isHoveringPhoto ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-wide">
                    Ganti Foto &amp; Atur Zoom
                  </span>
                  <span className="text-[10px] text-gray-200 max-w-[200px] leading-tight">
                    Klik untuk membuka panel upload, slider zoom in/out, dan pan posisi
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPhotoEditor();
                      }}
                      className="px-3 py-1 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Buka Editor Zoom</span>
                    </button>
                    <button
                      onClick={handleResetPhoto}
                      className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-rose-500/80 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Subtle gradient overlay at bottom of photo for text contrast */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white text-left pointer-events-none z-10">
                <div className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>{PROFILE_DATA.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                    Verified
                  </span>
                </div>
                <div className="text-xs text-gray-200 font-medium">
                  Bachelor of Entrepreneurship • GPA 3.71 / 4.00
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner Stats Strip in Apple Broken White Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4"
        >
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-black/[0.1] transition-all text-left group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#1d1d1f] mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#86868b] mt-0.5 truncate">
                {stat.note}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
