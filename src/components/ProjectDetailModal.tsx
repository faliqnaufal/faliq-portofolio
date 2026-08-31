import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Target,
  CheckCircle2,
  Sparkles,
  Layers,
  Wrench,
  Quote,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { ProjectDetail } from '../types';
import { PROFILE_DATA } from '../data/portfolioData';
import { AdjustableImage } from './AdjustableImage';
import { RajaPremiumBrandLogo, JupiterRoasteryBrandLogo } from './SelectedWorkSection';
import { useImageStore } from '../context/ImageStoreContext';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  const { getImageConfig } = useImageStore();
  const customLogoUrl = project ? getImageConfig(`project-logo-${project.id}`, '').url : '';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Modal Card in Apple Broken White Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/95 backdrop-blur-3xl border border-black/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.18)] overflow-hidden my-auto z-10 text-left"
        >
          
          {/* Top Sticky Bar */}
          <div className="p-4 sm:p-5 border-b border-black/[0.06] flex items-center justify-between bg-white/90 sticky top-0 z-20 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-bold">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-[#86868b] hidden sm:inline">
                {project.period}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#1d1d1f]">
            
            {/* Header Title & Subtitle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                  {project.role} • {project.client}
                </div>
                {customLogoUrl ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={customLogoUrl}
                      alt={`${project.client} Logo`}
                      className="h-8 max-w-[170px] object-contain drop-shadow-xs"
                    />
                  </div>
                ) : project.id === 'rajapremium-social-media' ? (
                  <div className="flex items-center justify-center">
                    <RajaPremiumBrandLogo className="h-8" />
                  </div>
                ) : project.id === 'jupiter-roastery' ? (
                  <div className="flex items-center justify-center">
                    <JupiterRoasteryBrandLogo className="h-8" />
                  </div>
                ) : null}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight leading-snug">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-[#6e6e73] mt-1">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.keyMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] space-y-1"
                >
                  <div className="text-lg sm:text-xl font-extrabold text-[#0071e3]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-[#1d1d1f]">{metric.label}</div>
                  {metric.note && (
                    <div className="text-[10px] text-[#86868b]">{metric.note}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Overview / Background */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0071e3]" />
                <span>Executive Summary &amp; Overview</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                {project.fullOverview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 sm:p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>The Challenge</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strategic Solution &amp; Execution</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {project.solution}
                </p>
              </div>

            </div>

            {/* Deliverables List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0071e3]" />
                <span>Tangible Deliverables &amp; Output</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#f5f5f7] border border-black/[0.04] flex items-center gap-2.5 text-xs text-[#1d1d1f] font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Documentation Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0071e3]" />
                    <span>Project Documentation &amp; Visual Assets ({project.gallery.length})</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((item, gIdx) => (
                    <div
                      key={gIdx}
                      className="group/img rounded-2xl overflow-hidden bg-[#f5f5f7] border border-black/[0.06] hover:border-[#0071e3]/40 transition-all flex flex-col"
                    >
                      <div className="relative aspect-video overflow-hidden bg-black/5">
                        <AdjustableImage
                          id={`project-${project.id}-gallery-${gIdx}`}
                          defaultSrc={item.image}
                          alt={item.title}
                          label={`${project.title} - Dok #${gIdx + 1}`}
                          className="group-hover/img:scale-105 transition-transform duration-500"
                        />
                        {item.tag && (
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md text-[10px] font-bold tracking-wide pointer-events-none z-10">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-3.5 space-y-1 bg-white">
                        <h5 className="text-xs font-bold text-[#1d1d1f] leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-[#6e6e73] leading-relaxed">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Used */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#0071e3]" />
                <span>Technologies &amp; Tools Utilized</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#f5f5f7] border border-black/[0.05] text-xs font-semibold text-[#1d1d1f]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Bottom Action Bar */}
          <div className="p-4 sm:p-5 border-t border-black/[0.06] bg-[#f5f5f7] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#86868b]">
              Case study by {PROFILE_DATA.name} • {PROFILE_DATA.degree}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-black/[0.08] bg-white hover:bg-black/[0.02] text-xs font-semibold text-[#1d1d1f] transition cursor-pointer"
              >
                Close
              </button>

              <a
                href={PROFILE_DATA.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss Similar Project</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
