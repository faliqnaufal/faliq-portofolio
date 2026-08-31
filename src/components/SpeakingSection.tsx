import React from 'react';
import { motion } from 'motion/react';
import {
  Mic2,
  Calendar,
  Sparkles,
  ArrowRight,
  Award
} from 'lucide-react';
import { SPEAKING_ENGAGEMENTS } from '../data/portfolioData';

export const SpeakingSection: React.FC = () => {
  return (
    <section id="speaking" className="py-24 relative bg-white border-y border-black/[0.04]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
            <Mic2 className="w-3.5 h-3.5" />
            <span>Public Speaking &amp; Presentations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Speaking Engagements &amp; Workshops
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-2xl">
            Invited presentations and workshops covering design communication, high-performing team governance, and student entrepreneurship ecosystems.
          </p>
        </div>

        {/* 2x2 Speaking Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {SPEAKING_ENGAGEMENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex flex-col justify-between hover:bg-white hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-black/[0.1] transition-all duration-300 space-y-6"
            >
              <div className="space-y-4">
                
                {/* Year & Role Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-bold">
                    {item.role}
                  </span>
                  <span className="text-xs font-semibold text-[#86868b]">
                    {item.year}
                  </span>
                </div>

                {/* Topic & Event Name */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    {item.event} • {item.type}
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight leading-snug">
                    {item.topic}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {item.description}
                </p>

                {/* Key Takeaway box */}
                <div className="p-3.5 rounded-2xl bg-white border border-black/[0.04] text-xs space-y-1">
                  <div className="font-bold text-[#1d1d1f]">Key Takeaway &amp; Framework:</div>
                  <div className="text-[#6e6e73] leading-relaxed">{item.takeaway}</div>
                </div>

              </div>

              {/* Badge text pill */}
              <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-black/[0.04] text-[11px] font-semibold text-[#424245]">
                  {item.badgeText}
                </span>

                <span className="text-[#0071e3] font-semibold flex items-center gap-1">
                  <span>Delivered Live</span>
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};
