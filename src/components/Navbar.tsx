import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  FileDown,
  Mail,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Sparkles,
  Camera,
  Sliders
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { useImageStore } from '../context/ImageStoreContext';

interface NavbarProps {
  onOpenCVModal: () => void;
  onOpenContact?: () => void;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop';

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCVModal
}) => {
  const { isOwnerMode, getImageConfig, openImageEditor } = useImageStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const avatarConfig = getImageConfig('navbar-brand-avatar', DEFAULT_AVATAR);
  const avatarUrl = avatarConfig.url;
  const zoom = avatarConfig.zoom ?? 1.0;
  const offsetX = avatarConfig.offsetX ?? 0;
  const offsetY = avatarConfig.offsetY ?? 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'work', 'about', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f5f5f7]/85 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo / Brand Identity */}
          <div className="flex items-center gap-1">
            <a
              href="#home"
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
            >
              <div
                id="navbar-brand-avatar"
                className="relative w-8 h-8 rounded-xl bg-[#1d1d1f] flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden group-hover:ring-2 group-hover:ring-[#0071e3]/40 transition-all shrink-0"
                title={isOwnerMode ? "Klik untuk menyesuaikan foto & zoom" : PROFILE_DATA.name}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={PROFILE_DATA.name}
                    className="w-full h-full object-cover transition-transform duration-150"
                    style={{
                      transform: `scale(${zoom || 1}) translate(${offsetX || 0}%, ${offsetY || 0}%)`
                    }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>FN</span>
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                  {PROFILE_DATA.name}
                </span>
                <span className="text-[10px] text-[#86868b] font-medium hidden sm:block">
                  Digital Marketer &amp; Brand Strategist
                </span>
              </div>
            </a>

            {/* Quick Button to customize avatar photo & zoom in/out (Only in Owner Mode) */}
            {isOwnerMode && (
              <button
                id="navbar-avatar-customizer-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openImageEditor('navbar-brand-avatar', DEFAULT_AVATAR, 'Foto Avatar Navbar');
                }}
                className="ml-1 p-1.5 rounded-lg text-[#86868b] hover:text-[#0071e3] hover:bg-black/5 transition-colors cursor-pointer"
                title="Ubah Foto & Atur Zoom In/Out Avatar Navbar"
                aria-label="Ubah Foto & Atur Zoom Avatar Navbar"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Navigation Links in Apple Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 border border-black/[0.06] rounded-full px-3 py-1 backdrop-blur-xl shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#1d1d1f] text-white shadow-xs'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs (CV Download & Contact) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="navbar-download-cv-btn"
              onClick={onOpenCVModal}
              className="px-3.5 py-2 rounded-full border border-black/[0.08] bg-white/80 hover:bg-white text-xs font-semibold text-[#1d1d1f] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
              title="View & Download Resume / CV"
            >
              <FileDown className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Resume (CV)</span>
            </button>

            <a
              id="navbar-contact-cta-btn"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition-all hover:shadow-sm active:scale-98 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="navbar-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 border border-black/[0.08] text-[#1d1d1f] hover:bg-white transition cursor-pointer shadow-xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-[#f5f5f7]/95 backdrop-blur-2xl border-b border-black/[0.08] p-6 md:hidden shadow-xl flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#1d1d1f] text-white'
                      : 'text-[#424245] hover:bg-black/[0.04] hover:text-[#1d1d1f]'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <Sparkles className="w-4 h-4 text-white" />}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCVModal();
                }}
                className="w-full py-3 rounded-xl border border-black/[0.08] bg-white text-sm font-semibold text-[#1d1d1f] flex items-center justify-center gap-2 shadow-xs"
              >
                <FileDown className="w-4 h-4 text-[#0071e3]" />
                <span>View &amp; Print Resume (PDF)</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="w-full py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>

              {/* Mobile Social Links with Instagram */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[#86868b] text-xs">
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0071e3] flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span>•</span>
                <a
                  href={PROFILE_DATA.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0071e3] flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>{PROFILE_DATA.instagramHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
