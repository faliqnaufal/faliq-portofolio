import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  BookOpen,
  CheckCircle2,
  Award,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { PUBLICATION_DATA } from '../data/portfolioData';

export const PublicationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = () => {
    const citation = `Naufal, F. (2026). Quasi-Moderasi Variety seeking dalam Hubungan Deal proneness dan Switching intention pada Konsumen Gen Z E-commerce Fashion. Jurnal Terakreditasi SINTA 3.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="publication" className="py-24 relative bg-[#f5f5f7]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Research &amp; Publication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Scientific Journal Publication
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-2xl">
            Empirical quantitative investigation on Gen Z digital consumer behavior, variety-seeking habits, and platform switching dynamics in fashion e-commerce.
          </p>
        </div>

        {/* Big Publication Card in Apple Broken White Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-left space-y-8"
        >
          
          {/* Status & Accreditation Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{PUBLICATION_DATA.accreditation}</span>
              </span>
              <span className="text-xs text-[#86868b] font-medium">
                {PUBLICATION_DATA.journal}
              </span>
            </div>

            <span className="text-xs text-[#6e6e73] font-semibold px-3 py-1 rounded-full bg-[#f5f5f7] self-start sm:self-center">
              Publication: {PUBLICATION_DATA.year}
            </span>
          </div>

          {/* Title & Author */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight leading-snug">
              &ldquo;{PUBLICATION_DATA.title}&rdquo;
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6e6e73]">
              <span className="font-semibold text-[#1d1d1f]">Lead Author: {PUBLICATION_DATA.authors.join(', ')}</span>
              <span>•</span>
              <span>Institution: Universitas Pendidikan Indonesia</span>
            </div>
          </div>

          {/* Abstract Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Research Abstract &amp; Managerial Summary</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
              {PUBLICATION_DATA.abstract}
            </p>
          </div>

          {/* Key Findings / Methodology Chips */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
              Key Findings &amp; Marketing Implications
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {PUBLICATION_DATA.keyFindings.map((finding, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-1.5">
                  <div className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Finding #{idx + 1}</span>
                  </div>
                  <div className="text-[#6e6e73] leading-relaxed">{finding}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action / Copy Citation */}
          <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#86868b]">
              Peer-reviewed statistical research analyzing SEM-PLS quantitative regression models.
            </span>

            <button
              onClick={handleCopyCitation}
              className="px-4 py-2 rounded-full border border-black/[0.08] bg-white hover:bg-[#f5f5f7] text-xs font-semibold text-[#1d1d1f] transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Citation Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Copy APA Citation</span>
                </>
              )}
            </button>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
