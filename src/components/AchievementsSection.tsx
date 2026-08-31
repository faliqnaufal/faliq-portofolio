import React from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative bg-white border-y border-black/[0.04]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Honors &amp; Funded Venture Grants</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Key Achievements &amp; Awards
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-2xl">
            National government venture grants, international Coursera masteries, top student organization leadership awards, and competitive pitch distinctions.
          </p>
        </div>

        {/* Achievements Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex flex-col justify-between hover:bg-white hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-black/[0.1] transition-all duration-300 space-y-6"
            >
              <div className="space-y-4">
                
                {/* Badge & Year */}
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="text-xs text-[#86868b] font-semibold">
                    {item.year}
                  </span>
                </div>

                {/* Title & Organizer */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#0071e3] font-semibold">
                    {item.organizer}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {item.description}
                </p>

              </div>

              {/* Highlight / Amount Pill */}
              <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between">
                <div className="text-xs text-[#6e6e73] font-medium">
                  {item.highlight}
                </div>
                {item.amount && (
                  <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.amount}</span>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};
