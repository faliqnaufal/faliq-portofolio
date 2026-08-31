import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Users,
  Building,
  TrendingUp,
  Sparkles,
  Images,
  Maximize2
} from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/portfolioData';
import { GalleryModalData } from './ProjectGalleryModal';
import { AdjustableImage } from './AdjustableImage';

interface ExperienceSectionProps {
  onOpenGallery: (data: GalleryModalData) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onOpenGallery
}) => {
  const [activeTab, setActiveTab] = useState<'professional' | 'organizational'>('professional');

  const professionalExperiences = EXPERIENCES_DATA.filter(
    (exp) => exp.category === 'professional' || exp.category === 'additional'
  );

  const organizationalExperiences = EXPERIENCES_DATA.filter(
    (exp) => exp.category === 'organizational'
  );

  const displayedExperiences =
    activeTab === 'professional' ? professionalExperiences : organizationalExperiences;

  return (
    <section id="experience" className="py-24 relative bg-[#f5f5f7]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Trajectory &amp; Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              Professional &amp; Organizational Experience
            </h2>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-xl">
              Demonstrated record managing digital ad campaigns, scaling social media reach, delivering national publication layouts, and presiding over executive student boards with verifiable project documentation.
            </p>
          </div>

          {/* Tab Selector in Apple Glassmorphism */}
          <div className="flex p-1 rounded-2xl bg-white/80 border border-black/[0.06] backdrop-blur-xl shadow-xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('professional')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'professional'
                  ? 'bg-[#1d1d1f] text-white shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional &amp; Projects ({professionalExperiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('organizational')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'organizational'
                  ? 'bg-[#1d1d1f] text-white shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Leadership &amp; Org ({organizationalExperiences.length})</span>
            </button>
          </div>
        </div>

        {/* Experience Cards List */}
        <div className="space-y-6 text-left">
          {displayedExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-black/[0.1] transition-all duration-300 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.05]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-bold">
                      {exp.categoryLabel}
                    </span>
                    <span className="text-xs text-[#86868b]">{exp.location}</span>
                    <span className="text-xs text-[#86868b]">•</span>
                    <span className="text-xs text-[#86868b]">{exp.type}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight">
                    {exp.role}
                  </h3>

                  <div className="text-sm font-semibold text-[#0071e3]">
                    {exp.company}
                  </div>
                </div>

                <div className="text-xs font-semibold text-[#6e6e73] px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.04] self-start sm:self-center">
                  {exp.period}
                </div>
              </div>

              {/* Summary quote if any */}
              {exp.summary && (
                <p className="text-xs sm:text-sm text-[#6e6e73] italic">
                  &ldquo;{exp.summary}&rdquo;
                </p>
              )}

              {/* Key Stats Chips */}
              {exp.keyStats && exp.keyStats.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {exp.keyStats.map((stat, sIdx) => (
                    <div key={sIdx} className="px-3 py-1.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#0071e3]">{stat.value}</span>
                      <span className="text-[11px] text-[#424245]">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullets List */}
              <div className="space-y-2.5">
                {exp.bulletPoints.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#424245] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Project Documentation & Visual Proof Gallery Strip */}
              {exp.gallery && exp.gallery.length > 0 && (
                <div className="pt-2 p-4 rounded-2xl bg-[#f5f5f7]/80 border border-black/[0.04] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
                      <Images className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Project Documentation &amp; Deliverables ({exp.gallery.length})</span>
                    </span>
                    <button
                      onClick={() =>
                        onOpenGallery({
                          title: exp.company,
                          subtitle: `${exp.role} • ${exp.period}`,
                          category: exp.categoryLabel,
                          period: exp.period,
                          items: exp.gallery || []
                        })
                      }
                      className="text-xs font-bold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Preview Gallery</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {exp.gallery.map((item, gIdx) => (
                      <div
                        key={gIdx}
                        onClick={() =>
                          onOpenGallery({
                            title: exp.company,
                            subtitle: `${exp.role} • ${exp.period}`,
                            category: exp.categoryLabel,
                            period: exp.period,
                            items: exp.gallery || [],
                            initialIndex: gIdx
                          })
                        }
                        className="group/thumb relative rounded-xl overflow-hidden bg-black/5 border border-black/[0.06] cursor-pointer hover:border-[#0071e3]/40 transition-all flex flex-col"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <AdjustableImage
                            id={`exp-${exp.id}-thumb-${gIdx}`}
                            defaultSrc={item.image}
                            alt={item.title}
                            label={`${exp.company} - ${item.title}`}
                            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                          />
                          {item.tag && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md text-[9px] font-bold z-10">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <div className="p-2 bg-white flex flex-col justify-between">
                          <span className="text-[11px] font-bold text-[#1d1d1f] truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-[#86868b] truncate">
                            {item.caption}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-[#f5f5f7] border border-black/[0.04] text-[11px] font-medium text-[#424245]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};
