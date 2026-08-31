import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-white border-y border-black/[0.04]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Education &amp; Academic Honors
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-2xl">
            Accredited formal training in strategic entrepreneurship, consumer research methodology, technology venture scaling, and product marketing.
          </p>
        </div>

        {/* Education Highlight Card in Apple Broken White Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-10 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-left space-y-8"
        >
          {/* Institution, Degree, Period */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/[0.06]">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Higher Education Degree (S1)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                {EDUCATION_DATA.institution}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#6e6e73]">
                <span className="font-semibold text-[#1d1d1f]">{EDUCATION_DATA.degree}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>{EDUCATION_DATA.period}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>{EDUCATION_DATA.location}</span>
                </span>
              </div>
            </div>

            {/* GPA Distinction Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center gap-3.5 self-start md:self-auto">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0071e3]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#86868b]">Cumulative GPA</div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f]">
                  {EDUCATION_DATA.gpa} <span className="text-xs text-[#86868b] font-normal">/ {EDUCATION_DATA.maxGpa}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Relevant Coursework Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
              <BookOpen className="w-4 h-4 text-[#0071e3]" />
              <span>Relevant Coursework &amp; Competency Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EDUCATION_DATA.coursework.map((course, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-black/[0.04] flex items-center gap-2.5 text-xs font-semibold text-[#1d1d1f] shadow-2xs hover:border-black/[0.1] transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Academic Highlights */}
          <div className="pt-2 border-t border-black/[0.04] space-y-2.5">
            {EDUCATION_DATA.keyHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#424245]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>

    </section>
  );
};
