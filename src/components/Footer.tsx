import React from 'react';
import {
  ArrowUp,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
  FileDown,
  Lock
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { useImageStore } from '../context/ImageStoreContext';

interface FooterProps {
  onOpenCVModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCVModal }) => {
  const { openAdminAuthModal, isOwnerMode } = useImageStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] text-[#6e6e73] text-xs py-14 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-black/[0.06]">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1d1d1f] flex items-center justify-center text-white font-bold text-xs">
                FN
              </div>
              <span className="text-base font-bold text-[#1d1d1f] tracking-tight">
                {PROFILE_DATA.name}
              </span>
            </div>
            <p className="text-xs text-[#86868b]">
              Bachelor of Entrepreneurship (UPI) • Digital Marketing &amp; Brand Strategist
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={PROFILE_DATA.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.02] text-[#1d1d1f] transition flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>{PROFILE_DATA.instagramHandle}</span>
            </a>

            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.02] text-[#1d1d1f] transition flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PROFILE_DATA.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.02] text-[#1d1d1f] transition flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="p-2.5 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.02] text-[#1d1d1f] transition flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Email</span>
            </a>

            <button
              onClick={onOpenCVModal}
              className="p-2.5 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.02] text-[#1d1d1f] transition text-xs font-semibold cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Resume (PDF)</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868b]">
          <div className="flex items-center gap-2">
            <span>© 2026 {PROFILE_DATA.name}. All Rights Reserved.</span>
            {!isOwnerMode && (
              <button
                onClick={openAdminAuthModal}
                className="opacity-20 hover:opacity-100 transition-opacity text-[#86868b] hover:text-[#0071e3] p-1 cursor-pointer"
                title="Akses Mode Pemilik"
                aria-label="Akses Mode Pemilik"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#1d1d1f] hover:text-[#0071e3] transition cursor-pointer font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
