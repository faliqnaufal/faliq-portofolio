import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wrench,
  Languages
} from 'lucide-react';
import { SKILL_GROUPS, TOOLS_DATA, LANGUAGES_DATA } from '../data/portfolioData';

// Authentic Brand Vector Logos
const BrandLogo: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case 'Shopee':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#EE4D2D" />
          <path
            d="M32 18H28.5C28.5 15.5 26.5 13.5 24 13.5C21.5 13.5 19.5 15.5 19.5 18H16C14.9 18 14 18.9 14 20L15.5 35C15.6 36.1 16.5 37 17.6 37H30.4C31.5 37 32.4 36.1 32.5 35L34 20C34 18.9 33.1 18 32 18ZM24 15.5C25.4 15.5 26.5 16.6 26.5 18H21.5C21.5 16.6 22.6 15.5 24 15.5ZM25.2 31.8C23.1 31.8 21.6 30.6 21.5 29.1H23.5C23.6 29.8 24.3 30.3 25.2 30.3C26.1 30.3 26.8 29.8 26.8 29.1C26.8 28.3 26.2 28 24.8 27.6C23 27.1 21.7 26.4 21.7 24.7C21.7 23.3 22.9 22.2 24.9 22.2C26.7 22.2 27.9 23.2 28.1 24.6H26.1C26 23.9 25.4 23.5 24.8 23.5C24 23.5 23.5 23.9 23.5 24.5C23.5 25.1 24 25.5 25.4 25.9C27.3 26.4 28.6 27.1 28.6 28.9C28.6 30.5 27.3 31.8 25.2 31.8Z"
            fill="white"
          />
        </svg>
      );

    case 'Tokopedia':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#03AC0E" />
          <path
            d="M32 16H29.5C29.5 13 27 10.5 24 10.5C21 10.5 18.5 13 18.5 16H16C13.8 16 12 17.8 12 20V32C12 34.2 13.8 36 16 36H32C34.2 36 36 34.2 36 32V20C36 17.8 34.2 16 32 16ZM24 12.5C25.9 12.5 27.5 14.1 27.5 16H20.5C20.5 14.1 22.1 12.5 24 12.5ZM19 25C17.9 25 17 24.1 17 23C17 21.9 17.9 21 19 21C20.1 21 21 21.9 21 23C21 24.1 20.1 25 19 25ZM29 25C27.9 25 27 24.1 27 23C27 21.9 27.9 21 29 21C30.1 21 31 21.9 31 23C31 24.1 30.1 25 29 25ZM24 33C20.7 33 18 30.3 18 27H30C30 30.3 27.3 33 24 33Z"
            fill="white"
          />
          <circle cx="19" cy="23" r="1.5" fill="#03AC0E" />
          <circle cx="29" cy="23" r="1.5" fill="#03AC0E" />
        </svg>
      );

    case 'Meta':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#0081FB" />
          <path
            d="M34.8 19.5C33.2 16.2 30.5 14.5 27.6 14.5C24.4 14.5 22.3 16.5 24 19.3C25.5 16.7 27.4 15.5 29.7 15.5C31.9 15.5 33.9 16.8 35.1 19.5C36.4 22.4 36.3 25.7 34.8 28.5C33.3 31.3 30.6 33 27.6 33C24.9 33 22.6 31.5 21 29C20.6 28.4 20.1 27.8 19.6 27.1C18.1 24.9 16.4 22.6 14.2 22.6C12.3 22.6 10.6 23.9 9.8 25.7C9 27.4 9 29.5 9.8 31.3C8.6 28.5 8.7 25.3 10.2 22.5C11.7 19.7 14.4 18 17.4 18C20.1 18 22.4 19.5 24 22C24.4 22.6 24.9 23.2 25.4 23.9C26.9 26.1 28.6 28.4 30.8 28.4C32.7 28.4 34.4 27.1 35.2 25.3C36 23.6 36 21.5 34.8 19.5Z"
            fill="white"
          />
        </svg>
      );

    case 'TikTok':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#010101" />
          <path
            d="M33.8 20.2C31.5 20.1 29.5 18.7 28.7 16.6C28.4 15.8 28.2 14.9 28.2 14H24.3V31.5C24.3 33.8 22.4 35.7 20.1 35.7C17.8 35.7 15.9 33.8 15.9 31.5C15.9 29.2 17.8 27.3 20.1 27.3C20.7 27.3 21.3 27.4 21.8 27.7V23.6C21.2 23.5 20.7 23.4 20.1 23.4C15.6 23.4 12 27 12 31.5C12 36 15.6 39.6 20.1 39.6C24.6 39.6 28.2 36 28.2 31.5V23.2C30.2 24.6 32.6 25.3 35 25.3V21.4C34.6 21.4 34.2 20.8 33.8 20.2Z"
            fill="#00F2FE"
          />
          <path
            d="M34.5 19.5C32.2 19.4 30.2 18 29.4 15.9C29.1 15.1 28.9 14.2 28.9 13.3H25V30.8C25 33.1 23.1 35 20.8 35C18.5 35 16.6 33.1 16.6 30.8C16.6 28.5 18.5 26.6 20.8 26.6C21.4 26.6 22 26.7 22.5 27V22.9C21.9 22.8 21.4 22.7 20.8 22.7C16.3 22.7 12.7 26.3 12.7 30.8C12.7 35.3 16.3 38.9 20.8 38.9C25.3 38.9 28.9 35.3 28.9 30.8V22.5C30.9 23.9 33.3 24.6 35.7 24.6V20.7C35.3 20.7 34.9 20.1 34.5 19.5Z"
            fill="#FE2C55"
          />
          <path
            d="M34.2 19.8C31.9 19.7 29.9 18.3 29.1 16.2C28.8 15.4 28.6 14.5 28.6 13.6H24.7V31.1C24.7 33.4 22.8 35.3 20.5 35.3C18.2 35.3 16.3 33.4 16.3 31.1C16.3 28.8 18.2 26.9 20.5 26.9C21.1 26.9 21.7 27 22.2 27.3V23.2C21.6 23.1 21.1 23 20.5 23C16 23 12.4 26.6 12.4 31.1C12.4 35.6 16 39.2 20.5 39.2C25 39.2 28.6 35.6 28.6 31.1V22.8C30.6 24.2 33 24.9 35.4 24.9V21C35 21 34.6 20.4 34.2 19.8Z"
            fill="white"
          />
        </svg>
      );

    case 'Canva':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="50%" stopColor="#7D2AE8" />
              <stop offset="100%" stopColor="#FF4081" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#canva-grad)" />
          <path
            d="M29.5 20.5C28.2 17.2 25.4 15 22 15C16.5 15 12 19.5 12 25C12 30.5 16.5 35 22 35C26.5 35 30.2 32.2 31.5 28.2L28.2 26.8C27.4 29.3 24.9 31.2 22 31.2C18.6 31.2 15.8 28.4 15.8 25C15.8 21.6 18.6 18.8 22 18.8C24.2 18.8 26.1 20 27.1 21.8L29.5 20.5Z"
            fill="white"
          />
        </svg>
      );

    case 'Photoshop':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#001E36" />
          <rect x="2" y="2" width="44" height="44" rx="8" stroke="#31A8FF" strokeWidth="2.5" fill="none" />
          <text x="14" y="32" fill="#31A8FF" fontSize="20" fontWeight="900" fontFamily="sans-serif">
            Ps
          </text>
        </svg>
      );

    case 'Illustrator':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#330000" />
          <rect x="2" y="2" width="44" height="44" rx="8" stroke="#FF9A00" strokeWidth="2.5" fill="none" />
          <text x="15" y="32" fill="#FF9A00" fontSize="20" fontWeight="900" fontFamily="sans-serif">
            Ai
          </text>
        </svg>
      );

    case 'CapCut':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#000000" />
          <path
            d="M13 16L24 23L35 16H29L24 19L19 16H13Z"
            fill="white"
          />
          <path
            d="M13 32L24 25L35 32H29L24 29L19 32H13Z"
            fill="white"
          />
        </svg>
      );

    case 'Word':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#185ABD" />
          <rect x="18" y="10" width="20" height="28" rx="3" fill="#2B7CD3" />
          <line x1="22" y1="16" x2="34" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="22" x2="34" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="28" x2="31" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <rect x="10" y="14" width="18" height="20" rx="3" fill="#103F91" />
          <text x="14" y="29" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            W
          </text>
        </svg>
      );

    case 'SPSS':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#0F62FE" />
          <path
            d="M14 34L22 22L28 27L34 14"
            stroke="#FF4081"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="34" r="3" fill="white" />
          <circle cx="22" cy="22" r="3" fill="white" />
          <circle cx="28" cy="27" r="3" fill="white" />
          <circle cx="34" cy="14" r="3" fill="white" />
        </svg>
      );

    case 'SmartPLS':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#F68B1F" />
          <circle cx="17" cy="18" r="4.5" fill="white" />
          <circle cx="17" cy="30" r="4.5" fill="white" />
          <circle cx="31" cy="24" r="5" fill="#1D1D1F" stroke="white" strokeWidth="2" />
          <line x1="21.5" y1="19.5" x2="26.5" y2="22.5" stroke="white" strokeWidth="2" />
          <line x1="21.5" y1="28.5" x2="26.5" y2="25.5" stroke="white" strokeWidth="2" />
        </svg>
      );

    case 'GoogleWorkspace':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#F8F9FA" stroke="#E5E7EB" strokeWidth="1.5" />
          <path d="M15 15L24 20L33 15L24 10L15 15Z" fill="#EA4335" />
          <path d="M15 15V27L24 32V20L15 15Z" fill="#4285F4" />
          <path d="M33 15V27L24 32V20L33 15Z" fill="#34A853" />
          <path d="M24 32L30 35.5L33 27L24 32Z" fill="#FBBC05" />
        </svg>
      );

    case 'GoogleAIStudio':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="ai-studio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="45%" stopColor="#9B72CB" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#ai-studio-grad)" />
          {/* 4-point Sparkle */}
          <path
            d="M24 10C24 17.7 17.7 24 10 24C17.7 24 24 30.3 24 38C24 30.3 30.3 24 38 24C30.3 24 24 17.7 24 10Z"
            fill="white"
          />
          <circle cx="34" cy="14" r="2.5" fill="#FBBC05" />
        </svg>
      );

    case 'ChatGPT':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#10A37F" />
          <path
            d="M34.2 21.6C33.8 17.7 30.7 14.8 27 15C26 15 25.1 15.3 24.3 15.8C23.5 14.2 21.8 13.1 19.8 13.3C16.3 13.7 13.7 16.8 14.2 20.3C12.7 21.7 12 23.8 12.4 25.9C13 29.5 16.3 32.1 19.9 31.7C20.4 32.8 21.3 33.7 22.5 34.2C25.9 35.6 29.8 33.9 31.1 30.5C32.8 29.9 34 28.4 34.4 26.6C35.1 25 35 23.2 34.2 21.6ZM24 28.5C21.5 28.5 19.5 26.5 19.5 24C19.5 21.5 21.5 19.5 24 19.5C26.5 19.5 28.5 21.5 28.5 24C28.5 26.5 26.5 28.5 24 28.5Z"
            fill="white"
          />
        </svg>
      );

    case 'Claude':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#D97757" />
          {/* Claude Asterisk */}
          <path
            d="M24 12V36M12 24H36M15.5 15.5L32.5 32.5M15.5 32.5L32.5 15.5"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'Gemini':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1BA1E3" />
              <stop offset="50%" stopColor="#5451E6" />
              <stop offset="100%" stopColor="#9B5DE5" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="#0D0D12" />
          <path
            d="M24 11C24 18.2 18.2 24 11 24C18.2 24 24 29.8 24 37C24 29.8 29.8 24 37 24C29.8 24 24 18.2 24 11Z"
            fill="url(#gemini-grad)"
          />
        </svg>
      );

    case 'NotebookLM':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#00875A" />
          <path
            d="M16 14C14.9 14 14 14.9 14 16V32C14 33.1 14.9 34 16 34H32C33.1 34 34 33.1 34 32V16C34 14.9 33.1 14 32 14H16ZM18 18H30V20H18V18ZM18 23H30V25H18V23ZM18 28H26V30H18V28Z"
            fill="white"
          />
          <circle cx="31" cy="29" r="3" fill="#FBBC05" />
        </svg>
      );

    case 'Perplexity':
      return (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#20B2AA" />
          <path
            d="M24 12V36M16 16L32 32M32 16L16 32M13 24H35"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return <Wrench className="w-5 h-5 text-gray-500" />;
  }
};

export const SkillsToolsSection: React.FC = () => {
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('All');

  const toolCategories = ['All', 'Marketing', 'Design & Video', 'Data & Research', 'AI & Productivity'];

  const filteredTools = selectedToolCategory === 'All'
    ? TOOLS_DATA
    : TOOLS_DATA.filter((t) => t.category === selectedToolCategory);

  return (
    <section id="skills" className="py-24 relative bg-[#f5f5f7]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
            <Wrench className="w-3.5 h-3.5" />
            <span>Core Competencies &amp; Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Skills, Software Stack &amp; Languages
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-2xl">
            A synergistic toolkit spanning growth marketing execution, high-fidelity visual design, statistical quantitative research, and AI-accelerated workflows.
          </p>
        </div>

        {/* 1. Skill Progress Bars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
          {SKILL_GROUPS.map((group, gIdx) => (
            <div
              key={gIdx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">
                  {group.category}
                </h3>
                <p className="text-xs text-[#6e6e73]">
                  {group.description}
                </p>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill, sIdx) => {
                  const skillItem = typeof skill === 'string' ? { name: skill, level: 80, levelLabel: 'Intermediate', description: '' } : skill;
                  const numLevel = typeof skillItem.level === 'number' ? skillItem.level : 80;
                  
                  return (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#1d1d1f]">{skillItem.name}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          skillItem.levelLabel === 'Expert'
                            ? 'bg-blue-50 text-[#0071e3] border border-blue-200'
                            : skillItem.levelLabel === 'Advanced'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {skillItem.levelLabel}
                        </span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="w-full h-2 rounded-full bg-black/[0.04] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${numLevel}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            skillItem.levelLabel === 'Expert'
                              ? 'bg-gradient-to-r from-[#0071e3] to-[#6366f1]'
                              : skillItem.levelLabel === 'Advanced'
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                                : 'bg-gradient-to-r from-teal-500 to-emerald-600'
                          }`}
                        />
                      </div>

                      {skillItem.description && (
                        <div className="text-[11px] text-[#86868b]">
                          {skillItem.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Tools & Software Directory */}
        <div className="space-y-6 text-left mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                Software &amp; Productivity Stack
              </h3>
              <p className="text-xs text-[#6e6e73]">
                Daily operating tools for digital ads, visual brand assets, statistical modeling, and generative AI.
              </p>
            </div>

            {/* Tool Category Selector */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/80 border border-black/[0.06] backdrop-blur-xl shadow-xs">
              {toolCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedToolCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedToolCategory === cat
                      ? 'bg-[#1d1d1f] text-white shadow-xs'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {filteredTools.map((tool, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.12] hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-center p-1.5 shadow-2xs">
                    <BrandLogo icon={tool.icon || ''} />
                  </div>
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                    {tool.category}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1d1d1f] truncate">{tool.name}</div>
                  <div className="text-[10px] text-[#6e6e73] mt-0.5 leading-snug">{tool.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Languages Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-left">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0071e3] mb-4">
            <Languages className="w-4 h-4" />
            <span>Language Proficiency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LANGUAGES_DATA.map((lang, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-bold text-[#1d1d1f]">{lang.language}</div>
                    <div className="text-xs text-[#6e6e73]">{lang.level}</div>
                  </div>
                </div>

                {lang.score ? (
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0071e3] text-xs font-bold">
                    {lang.score}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    Native
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

