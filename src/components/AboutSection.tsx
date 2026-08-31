import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Target,
  Zap,
  Users,
  BrainCircuit,
  FileDown,
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCVModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCVModal }) => {
  const corePillars = [
    {
      icon: Target,
      title: 'Strategic Business Acumen',
      description: 'Analyzing target market dynamics, mapping buyer personas, and formulating sustainable business models with high unit economics.',
      badge: 'Strategic Vision',
      badgeStyle: 'bg-blue-50 text-[#0071e3] border-blue-200'
    },
    {
      icon: Zap,
      title: 'Growth-Focused Execution',
      description: 'Translating creative concepts into algorithmic performance (Shopee Ads GMV Max, viral Reels with 100K+ views, and modular asset kits).',
      badge: 'Growth Execution',
      badgeStyle: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      icon: Users,
      title: 'Collaborative Governance',
      description: 'Presided over 60+ executive board members in HIMA UPI (HIMA of the Year) and co-founded I-ESA across 35 universities nationwide.',
      badge: 'Team Leadership',
      badgeStyle: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      icon: BrainCircuit,
      title: 'Empirical Research & AI Workflows',
      description: 'Applying SEM-PLS & SPSS quantitative rigor for SINTA 3 publications, paired with advanced generative AI tools for productivity.',
      badge: 'Analytical Mindset',
      badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#ffffff] border-y border-black/[0.04]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
            <User className="w-3.5 h-3.5" />
            <span>Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Synthesizing Business Logic, Design &amp; Leadership
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-2xl">
            A comprehensive background uniting quantitative business training, practical brand growth execution, and proven organizational management.
          </p>
        </div>

        {/* Story & Core Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Left: Narrative & Biography (Col 6) */}
          <div className="lg:col-span-6 space-y-5 text-[#424245] text-sm sm:text-base leading-relaxed">
            <p>
              I am a Bachelor of Entrepreneurship graduate from <strong className="text-[#1d1d1f]">Universitas Pendidikan Indonesia (UPI)</strong>, graduating with a cumulative GPA of <strong className="text-[#0071e3] font-bold">3.71 / 4.00</strong>. My career operates at the intersection of business strategy and high-fidelity creative visual execution.
            </p>
            <p>
              Through hands-on commercial roles, I have managed marketplace growth and paid advertising at <strong className="text-[#1d1d1f]">Jupiter Roastery</strong>, generated organic viral traction at <strong className="text-[#1d1d1f]">RajaPremium.id</strong> (yielding multiple 100K+ view Reels), and designed 207 pages of official national handbooks for the <strong className="text-[#1d1d1f]">Ministry of Cooperatives and SMEs RI</strong>.
            </p>
            <p>
              In leadership, I served as <strong className="text-[#1d1d1f]">President of the Entrepreneurship Student Association (HIMA UPI)</strong>, leading 60+ committee members to earn the prestigious <em>HIMA of the Year</em> award. Additionally, I co-founded the <strong className="text-[#1d1d1f]">Indonesia Entrepreneurship Student Association (I-ESA)</strong> with student leaders from ITB, IPB, and BINUS.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                id="about-download-cv-btn"
                onClick={onOpenCVModal}
                className="px-5 py-3 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <FileDown className="w-4 h-4 text-white" />
                <span>View Full Resume (PDF)</span>
              </button>

              <a
                href="#experience"
                className="px-4 py-3 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Experience</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: 4 Core Competency Pillars (Col 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] hover:border-black/[0.1] hover:bg-white hover:shadow-md transition-all space-y-2.5 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#1d1d1f] flex items-center justify-center shadow-xs border border-black/[0.04] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pillar.badgeStyle}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};
