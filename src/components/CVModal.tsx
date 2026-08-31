import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Printer,
  FileDown,
  Copy,
  Check,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  MapPin,
  Sparkles
} from 'lucide-react';
import {
  PROFILE_DATA,
  EDUCATION_DATA,
  EXPERIENCES_DATA,
  SPEAKING_ENGAGEMENTS,
  PUBLICATION_DATA,
  ACHIEVEMENTS_DATA,
  TOOLS_DATA,
  LANGUAGES_DATA
} from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCVText = () => {
    const text = `
FALIQ NAUFAL
${PROFILE_DATA.phone} | ${PROFILE_DATA.email} | linkedin.com/in/faliqnaufal | instagram.com/faliqnaufal_
Bandung, West Java, Indonesia

Professional Summary:
${PROFILE_DATA.summary}

Education:
${EDUCATION_DATA.institution} (${EDUCATION_DATA.period})
${EDUCATION_DATA.degree} | GPA: ${EDUCATION_DATA.gpa} / ${EDUCATION_DATA.maxGpa}
Relevant Coursework: ${EDUCATION_DATA.coursework.join(', ')}.

Professional Experience:
- Jupiter Roastery | Digital Marketing Intern (Aug 2025 - Nov 2025)
- RajaPremium.id | Graphic Designer & Social Media Specialist (Jul 2025 - Sep 2025)
- Siloka Group | Graphic Design Intern (Feb 2025 - Apr 2025)
- Kementerian Koperasi & UKM x EntreDev | Book Layout Designer (Jun 2024 - Nov 2024)

Organizational Leadership:
- Indonesia Entrepreneurship Student Association (I-ESA) | Co-Founder (Oct 2024 - July 2025)
- Association of Entrepreneurship Students (HIMA UPI) | President (Jan 2024 - Dec 2024)

Speaking Engagements:
- ASSETUP! 2026: Design for Impact
- Leaderpreneur 2025: Leadership is Influence: Learn, Execute & Evaluate
- Upgrading 2025: The Power of Organizational Synergy
- APSKI International Conference & Seminar 2025: Co-Presenter

Publication:
- Quasi-Moderasi Variety seeking dalam Hubungan Deal proneness dan Switching intention pada Konsumen Gen Z E-commerce Fashion (SINTA 3 Journal)

Key Achievements:
- 79 Coursera Certifications (PPDKM Program)
- IDR 35 Million PPK Ormawa Ministry Grant
- IDR 30 Million Sumedang MSME Economic Recovery Project
- DClass (P2MW) & Motobile (Podomoro International Pitching)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:m-0 print:bg-white print:text-black">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-md print:hidden"
      />

      {/* Modal Card in Apple Broken White Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white border border-black/10 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden my-auto z-10 text-left print:border-none print:shadow-none print:max-h-none print:rounded-none print:bg-white print:text-black"
      >
        
        {/* Top Sticky Bar (Hidden on print) */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] flex items-center justify-between bg-white/90 sticky top-0 z-20 backdrop-blur-xl print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curriculum Vitae Preview</span>
            </span>
            <span className="text-xs text-[#86868b] hidden sm:inline">
              {PROFILE_DATA.name} • {PROFILE_DATA.degree}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCVText}
              className="px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-xs font-bold text-white flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] transition cursor-pointer ml-1"
              aria-label="Close CV modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body Container */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-[#1d1d1f] print:text-black print:p-8 print:overflow-visible font-sans bg-white">
          
          {/* 1. Resume Header */}
          <div className="border-b border-black/10 print:border-gray-300 pb-5 space-y-2">
            <h1 className="text-3xl font-black text-[#1d1d1f] print:text-black tracking-tight">
              {PROFILE_DATA.name.toUpperCase()}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#424245] print:text-gray-700">
              <span className="font-bold text-[#0071e3] print:text-black">{PROFILE_DATA.phone}</span>
              <span>|</span>
              <a href={`mailto:${PROFILE_DATA.email}`} className="hover:underline">{PROFILE_DATA.email}</a>
              <span>|</span>
              <a href={PROFILE_DATA.linkedin} target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/faliqnaufal</a>
              <span>|</span>
              <a href={PROFILE_DATA.instagram} target="_blank" rel="noreferrer" className="hover:underline text-pink-600 print:text-gray-800">instagram.com/faliqnaufal_</a>
            </div>

            <div className="text-xs text-[#86868b] print:text-gray-600">
              {PROFILE_DATA.location}
            </div>

            <p className="text-xs sm:text-sm text-[#424245] print:text-gray-800 leading-relaxed pt-2">
              {PROFILE_DATA.summary}
            </p>
          </div>

          {/* 2. Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              EDUCATION
            </h2>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#1d1d1f] print:text-black text-sm">{EDUCATION_DATA.institution}</span>
                <span className="text-[#86868b] print:text-gray-600">{EDUCATION_DATA.period}</span>
              </div>
              <div className="text-[#424245] print:text-gray-800 font-medium">
                {EDUCATION_DATA.degree} | <span className="font-bold text-[#1d1d1f] print:text-black">GPA: {EDUCATION_DATA.gpa} / {EDUCATION_DATA.maxGpa}</span>
              </div>
              <div className="text-[#6e6e73] print:text-gray-600 leading-relaxed">
                <strong className="text-[#1d1d1f] print:text-gray-700">Relevant Coursework:</strong> {EDUCATION_DATA.coursework.join(', ')}.
              </div>
            </div>
          </div>

          {/* 3. Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>

            {/* Jupiter Roastery */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[#1d1d1f] print:text-black">Jupiter Roastery</span>
                  <span className="text-[#86868b] print:text-gray-600"> | Tasikmalaya, West Java</span>
                </div>
                <span className="text-[#86868b] print:text-gray-600">Aug 2025 – Nov 2025</span>
              </div>
              <div className="italic text-[#0071e3] print:text-gray-800 font-semibold">Digital Marketing Intern</div>
              <ul className="list-disc list-inside space-y-1 text-[#424245] print:text-gray-800 leading-relaxed">
                <li>Designed 40+ marketplace visual assets and 20+ promotional materials for Shopee, Tokopedia, and TOCO while maintaining consistent brand identity.</li>
                <li>Optimized 30+ product listings and produced three short-form video concepts per week while supporting Shopee Ads GMV Max campaigns.</li>
                <li>Developed 6+ reusable design templates to improve workflow efficiency and visual consistency.</li>
              </ul>
            </div>

            {/* RajaPremium.id */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[#1d1d1f] print:text-black">RajaPremium.id</span>
                  <span className="text-[#86868b] print:text-gray-600"> | Remote</span>
                </div>
                <span className="text-[#86868b] print:text-gray-600">Jul 2025 – Sep 2025</span>
              </div>
              <div className="italic text-[#0071e3] print:text-gray-800 font-semibold">Graphic Designer &amp; Social Media Specialist</div>
              <ul className="list-disc list-inside space-y-1 text-[#424245] print:text-gray-800 leading-relaxed">
                <li>Developed monthly social media plans, 24 video briefs per month, and 3 feed designs per week for Instagram and TikTok.</li>
                <li>Grew Instagram to 1,000 followers in under one month and TikTok to 200 followers in less than two weeks.</li>
                <li>Produced three Reels that each reached 100,000+ views.</li>
              </ul>
            </div>

            {/* Siloka Group */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[#1d1d1f] print:text-black">Siloka Group</span>
                  <span className="text-[#86868b] print:text-gray-600"> | Tasikmalaya, West Java</span>
                </div>
                <span className="text-[#86868b] print:text-gray-600">Feb 2025 – Apr 2025</span>
              </div>
              <div className="italic text-[#0071e3] print:text-gray-800 font-semibold">Graphic Design Intern</div>
              <ul className="list-disc list-inside space-y-1 text-[#424245] print:text-gray-800 leading-relaxed">
                <li>Created 12 coffee board designs, supported documentation for two major events, and maintained visual merchandising across four store branches.</li>
              </ul>
            </div>

            {/* Kemenkop UKM x EntreDev */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[#1d1d1f] print:text-black">Ministry of Cooperatives &amp; SMEs RI x EntreDev</span>
                  <span className="text-[#86868b] print:text-gray-600"> | Remote</span>
                </div>
                <span className="text-[#86868b] print:text-gray-600">Jun 2024 – Nov 2024</span>
              </div>
              <div className="italic text-[#0071e3] print:text-gray-800 font-semibold">Book Layout Designer</div>
              <ul className="list-disc list-inside space-y-1 text-[#424245] print:text-gray-800 leading-relaxed">
                <li>Designed and formatted two national-level entrepreneurship books totaling 207 pages using Microsoft Word and Canva.</li>
              </ul>
            </div>

          </div>

          {/* 4. Additional Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              ADDITIONAL EXPERIENCE
            </h2>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#1d1d1f] print:text-black">Vecta | Freelance Graphic Designer</span>
                <span className="text-[#86868b] print:text-gray-600">May 2025 – Jun 2025</span>
              </div>
              <p className="text-[#424245] print:text-gray-800">Delivered 11 social media designs for Cikospace and Bebee Thaitea, aligning each output with the respective brand identity.</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#1d1d1f] print:text-black">Innovation Hub | Public Relations &amp; Design</span>
                <span className="text-[#86868b] print:text-gray-600">Mar 2023 – Dec 2024</span>
              </div>
              <p className="text-[#424245] print:text-gray-800">Assisted approximately 30 students weekly in using digital tools to develop business prototypes and marketing strategies.</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#1d1d1f] print:text-black">Enakinaja | Marketing Consultant</span>
                <span className="text-[#86868b] print:text-gray-600">Feb 2024 – Jun 2024</span>
              </div>
              <p className="text-[#424245] print:text-gray-800">Developed a marketing plan and activated Instagram content, increasing account insights and visibility by 30%.</p>
            </div>
          </div>

          {/* 5. Organizational Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              ORGANIZATIONAL EXPERIENCE
            </h2>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#1d1d1f] print:text-black">Indonesia Entrepreneurship Student Association (I-ESA) | Co-Founder</span>
                <span className="text-[#86868b] print:text-gray-600">Oct 2024 – July 2025</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#424245] print:text-gray-800 leading-relaxed">
                <li>Co-initiated I-ESA with representatives from BINUS, IPB, and ITB and gathered 100+ participants at kickoff meeting.</li>
                <li>Launched the association at Amikom Yogyakarta with 35 universities and 150+ offline and online participants.</li>
              </ul>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#1d1d1f] print:text-black">Association of Entrepreneurship Students (HIMA) UPI | President</span>
                <span className="text-[#86868b] print:text-gray-600">Jan 2024 – Dec 2024</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#424245] print:text-gray-800 leading-relaxed">
                <li>Led 60+ members across nine departments and 20+ divisions, delivering 40+ strategic programs and earning the &ldquo;HIMA of the Year&rdquo; award.</li>
                <li>Built collaborations with 30+ study programme and generated IDR 13M+ in profit from events and partnerships.</li>
                <li>Increased Instagram followers by 490 and average likes from 40 to 150 within 12 months.</li>
              </ul>
            </div>
          </div>

          {/* 6. Speaking Engagements */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              SPEAKING ENGAGEMENTS
            </h2>
            <div className="space-y-1.5 text-xs text-[#424245] print:text-gray-800">
              <div className="flex justify-between">
                <span><strong>ASSETUP!</strong> — Speaker: <em>Design for Impact</em></span>
                <span className="text-[#86868b] print:text-gray-600">2026</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Leaderpreneur</strong> — Speaker: <em>Leadership is Influence: Learn, Execute &amp; Evaluate</em></span>
                <span className="text-[#86868b] print:text-gray-600">2025</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Upgrading</strong> — Speaker: <em>The Power of Organizational Synergy: How to Align People, Vision, and Growth</em></span>
                <span className="text-[#86868b] print:text-gray-600">2025</span>
              </div>
              <div className="flex justify-between">
                <span><strong>APSKI International Conference &amp; Seminar</strong> — Co-Presenter: <em>Presented the launch of I-ESA with four university founding representatives</em></span>
                <span className="text-[#86868b] print:text-gray-600">2025</span>
              </div>
            </div>
          </div>

          {/* 7. Publication */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              SCIENTIFIC PUBLICATION
            </h2>
            <p className="text-xs text-[#424245] print:text-gray-800 leading-relaxed">
              • Quasi-Moderasi Variety seeking dalam Hubungan Deal proneness dan Switching intention pada Konsumen Gen Z E-commerce Fashion (<strong className="text-[#1d1d1f] print:text-black">SINTA 3-accredited journal</strong>)
            </p>
          </div>

          {/* 8. Selected Achievements & Projects */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              SELECTED ACHIEVEMENTS &amp; PROJECTS
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#424245] print:text-gray-800 leading-relaxed">
              <li>Earned <strong>79 certifications</strong> through the PPDKM Coursera Program, covering entrepreneurship, business, digital marketing, technology, and professional development.</li>
              <li>Secured <strong>IDR 35 million</strong> in Ministry of Education and Culture funding through PPK Ormawa for the PRODIGI project.</li>
              <li>Selected as a student team member for an <strong>IDR 30 million</strong> university-funded community service project supporting post-earthquake MSME recovery in Sumedang.</li>
              <li>Presented DClass in the P2MW Business Plan Competition and Motobile in an international business pitching competition by Podomoro University.</li>
            </ul>
          </div>

          {/* 9. Technical Skills & Languages */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0071e3] print:text-black border-b border-black/10 print:border-gray-300 pb-1">
              TECHNICAL SKILLS &amp; LANGUAGES
            </h2>
            <div className="space-y-1 text-xs text-[#424245] print:text-gray-800 leading-relaxed">
              <div><strong>Marketing &amp; Business:</strong> Digital Marketing, Social Media Strategy, Branding, Content Planning, and Project Management.</div>
              <div><strong>Design &amp; Productivity:</strong> Canva, Adobe Photoshop, Adobe Illustrator, CapCut, Microsoft Office, and Google Workspace.</div>
              <div><strong>Others &amp; AI:</strong> SPSS, SmartPLS, ChatGPT, Gemini, Claude, NotebookLM &amp; Perplexity.</div>
              <div><strong>Languages:</strong> Indonesian (Native); English (B2 Upper-Intermediate, PTESOL 487).</div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Print Button (Hidden on print) */}
        <div className="p-4 border-t border-black/[0.06] bg-[#f5f5f7] flex items-center justify-between print:hidden">
          <span className="text-xs text-[#86868b]">
            Standard executive curriculum vitae formatting.
          </span>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer shadow-sm active:scale-98"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Now</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
